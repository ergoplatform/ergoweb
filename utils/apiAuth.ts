import { timingSafeEqual } from 'crypto';
import type { NextApiRequest } from 'next';

export function hasBearerSecret(req: NextApiRequest, secret?: string): boolean {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : '';
  if (!secret || !token) return false;

  const encoder = new TextEncoder();
  const tokenBytes = encoder.encode(token);
  const secretBytes = encoder.encode(secret);
  if (tokenBytes.length !== secretBytes.length) return false;

  return timingSafeEqual(tokenBytes, secretBytes);
}
