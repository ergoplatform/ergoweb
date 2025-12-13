import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, text, confirm_email } = req.body;

  // 1. Spam check (Honeypot)
  if (confirm_email) {
    // If the honeypot field is filled, silently fail (or return success to fool the bot)
    return res.status(200).json({ message: 'Message sent successfully!' });
  }

  // 2. Input Validation
  if (!name || !email || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // 3. Configure Transporter
    // TODO: Configure these with actual environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'user',
        pass: process.env.SMTP_PASS || 'pass',
      },
    });

    // 4. Send Email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_FROM || 'no-reply@ergoplatform.org'}>`,
      to: 'team@ergoplatform.org', // Target email
      replyTo: email,
      subject: `New Contact Request from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${text}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${text.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}
