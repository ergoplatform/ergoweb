import type { NextApiRequest, NextApiResponse } from 'next';

type Resp = {
  openaiEnv: boolean;
  liveCheck: {
    ok: boolean;
    status: number | null;
    error?: string;
  };
};

// Server-side only health check for OpenAI config.
// Does NOT log or return the API key. Safe to keep briefly for verification and then remove.
export default async function handler(req: NextApiRequest, res: NextApiResponse<Resp>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      openaiEnv: Boolean(process.env.OPENAI_API_KEY),
      liveCheck: { ok: false, status: 405, error: 'Method Not Allowed' },
    });
  }

  const hasEnv = Boolean(process.env.OPENAI_API_KEY);

  // If no env var on server, return early
  if (!hasEnv) {
    return res.status(200).json({
      openaiEnv: false,
      liveCheck: { ok: false, status: null, error: 'OPENAI_API_KEY not set on server' },
    });
  }

  // Minimal live check against OpenAI without exposing the key.
  // Hitting models endpoint is cheap and confirms key validity/network reachability.
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const r = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
      },
      signal: controller.signal,
    }).catch((e) => {
      throw e;
    });
    clearTimeout(timeout);

    // 200/2xx indicates it works; 401 indicates key invalid; both are useful signals.
    return res.status(200).json({
      openaiEnv: true,
      liveCheck: { ok: r.ok, status: r.status },
    });
  } catch (e: any) {
    return res.status(200).json({
      openaiEnv: true,
      liveCheck: {
        ok: false,
        status: null,
        error: e?.name === 'AbortError' ? 'timeout' : String(e?.message || e),
      },
    });
  }
}
