/**
 * AI translation utilities.
 * - Prefers OpenAI if OPENAI_API_KEY is set
 * - Falls back to DeepL if DEEPL_API_KEY is set
 * - If no provider is available or target is 'en', returns original text
 *
 * NOTE: This module is only invoked server-side (e.g., from getServerSideProps).
 */

type Fields = {
  title: string;
  subtitle: string;
  content: string; // markdown
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

function fieldsEqual(a: Fields, b: Fields): boolean {
  const norm = (s: string) => (s || '').trim();
  return (
    norm(a.title) === norm(b.title) &&
    norm(a.subtitle) === norm(b.subtitle) &&
    norm(a.content) === norm(b.content)
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeSiteLocaleToOpenAI(locale: string): string {
  // Use general language names/codes OpenAI will understand in instructions
  // We pass this into the prompt, not as a strict code.
  const base = (locale || '').toLowerCase().split('-')[0];
  switch (base) {
    case 'cn':
    case 'zh':
      return 'Chinese (Simplified)';
    case 'de':
      return 'German';
    case 'it':
      return 'Italian';
    case 'es':
      return 'Spanish';
    case 'pl':
      return 'Polish';
    case 'pt':
      return 'Portuguese';
    case 'sk':
      return 'Slovak';
    case 'hu':
      return 'Hungarian';
    case 'ru':
      return 'Russian';
    case 'id':
      return 'Indonesian';
    case 'tr':
      return 'Turkish';
    case 'en':
    default:
      return 'English';
  }
}

function normalizeSiteLocaleToDeepL(locale: string): { source?: string; target: string } {
  // DeepL language codes: https://www.deepl.com/docs-api/translate-text/translate-text
  // Map site locales to DeepL target_lang codes
  const base = (locale || '').toLowerCase().split('-')[0];
  switch (base) {
    case 'cn':
    case 'zh':
      return { target: 'ZH' }; // Chinese (simplified)
    case 'de':
      return { target: 'DE' };
    case 'it':
      return { target: 'IT' };
    case 'es':
      return { target: 'ES' };
    case 'pl':
      return { target: 'PL' };
    case 'pt':
      // Default to European Portuguese; change to 'PT-BR' if you prefer Brazilian Portuguese
      return { target: 'PT-PT' };
    case 'sk':
      return { target: 'SK' };
    case 'hu':
      return { target: 'HU' };
    case 'ru':
      return { target: 'RU' };
    case 'id':
      return { target: 'ID' };
    case 'tr':
      return { target: 'TR' };
    case 'en':
    default:
      return { target: 'EN' };
  }
}

async function translateWithOpenAI(fields: Fields, from: string, to: string): Promise<Fields> {
  if (!OPENAI_API_KEY) return fields;
  const src = normalizeSiteLocaleToOpenAI(from);
  const tgt = normalizeSiteLocaleToOpenAI(to);

  const payload = {
    model: 'gpt-4o-mini',
    temperature: 0,
    response_format: { type: 'json_object' as const },
    messages: [
      {
        role: 'system',
        content:
          'You are a professional localization translator. Translate the provided fields to the target language. Preserve Markdown structure, links/URLs, HTML, and code blocks exactly. Do not add or remove content. Do not translate proper nouns like Ergo or project/product names. Return ONLY minified JSON with keys: title, subtitle, content.',
      },
      {
        role: 'user',
        content:
          `Translate the following JSON fields from ${src} to ${tgt}. ` +
          `Only return JSON with keys "title","subtitle","content".\n` +
          JSON.stringify({
            title: fields.title || '',
            subtitle: fields.subtitle || '',
            content: fields.content || '',
          }),
      },
    ],
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // On failure, just return original
    return fields;
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.message ?? '';

  const tryParseJson = (text: string) => {
    try {
      return JSON.parse(text);
    } catch {
      // Try to extract JSON substring
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try {
          return JSON.parse(text.slice(start, end + 1));
        } catch {
          return null;
        }
      }
      return null;
    }
  };

  const parsed = typeof content === 'string' ? tryParseJson(content) : null;
  if (!parsed) return fields;

  return {
    title: parsed.title ?? fields.title,
    subtitle: parsed.subtitle ?? fields.subtitle,
    content: parsed.content ?? fields.content,
  };
}

async function translateWithDeepL(fields: Fields, from: string, to: string): Promise<Fields> {
  if (!DEEPL_API_KEY) return fields;

  const targetInfo = normalizeSiteLocaleToDeepL(to);
  const sourceInfo = normalizeSiteLocaleToDeepL(from);

  const params = new URLSearchParams();
  params.append('text', fields.title || '');
  params.append('text', fields.subtitle || '');
  params.append('text', fields.content || '');
  params.append('target_lang', targetInfo.target);
  // Provide source language when known; DeepL can auto-detect, but we keep it explicit for EN
  if (from) {
    const src = sourceInfo.target;
    if (src) params.append('source_lang', src);
  }
  // Try to preserve formatting as much as possible
  params.append('preserve_formatting', '1');

  const endpoint =
    (process.env.DEEPL_API_ENDPOINT as string) ||
    // If you know you're on the free plan, you can set DEEPL_API_ENDPOINT=https://api-free.deepl.com/v2/translate
    'https://api.deepl.com/v2/translate';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    return fields;
  }
  const data = await res.json();
  const translations: { text: string }[] = data?.translations || [];

  // Expect 3 translations in order: title, subtitle, content
  const [tTitle, tSubtitle, tContent] = translations;

  return {
    title: tTitle?.text ?? fields.title,
    subtitle: tSubtitle?.text ?? fields.subtitle,
    content: tContent?.text ?? fields.content,
  };
}

export async function translateFields(fields: Fields, from: string, to: string): Promise<Fields> {
  const src = (from || 'en').toLowerCase();
  const tgt = (to || 'en').toLowerCase();
  if (src === tgt) return fields;

  const maxAttempts = 2;

  async function tryWithRetries<T>(
    fn: () => Promise<T>,
    attempts: number,
    delayMs: number,
  ): Promise<T> {
    let lastErr: any;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (e) {
        lastErr = e;
        if (i < attempts - 1) await sleep(delayMs);
      }
    }
    throw lastErr;
  }

  // Prefer OpenAI, then DeepL; retry each provider up to maxAttempts with small backoff
  // If the translation result is effectively identical to input (common provider failure mode),
  // fall back to the other provider before giving up.
  const original = fields;

  if (OPENAI_API_KEY) {
    try {
      const openAiResult = await tryWithRetries(
        () => translateWithOpenAI(original, from, to),
        maxAttempts,
        700,
      );
      if (!fieldsEqual(openAiResult, original) || tgt === 'en') {
        return openAiResult;
      }
      // Else fall through to DeepL
    } catch {
      // fall through to DeepL
    }
  }

  if (DEEPL_API_KEY) {
    try {
      const deepLResult = await tryWithRetries(
        () => translateWithDeepL(original, from, to),
        maxAttempts,
        700,
      );
      if (!fieldsEqual(deepLResult, original) || tgt === 'en') {
        return deepLResult;
      }
      // If still identical and OpenAI available, try OpenAI again as last resort
      if (OPENAI_API_KEY) {
        try {
          const openAiResult2 = await tryWithRetries(
            () => translateWithOpenAI(original, from, to),
            maxAttempts,
            700,
          );
          if (!fieldsEqual(openAiResult2, original) || tgt === 'en') {
            return openAiResult2;
          }
        } catch {
          // ignore
        }
      }
    } catch {
      // If DeepL path throws and OpenAI is available, try it as fallback
      if (OPENAI_API_KEY) {
        try {
          const openAiResult2 = await tryWithRetries(
            () => translateWithOpenAI(original, from, to),
            maxAttempts,
            700,
          );
          if (!fieldsEqual(openAiResult2, original) || tgt === 'en') {
            return openAiResult2;
          }
        } catch {
          // ignore; will fall through to original
        }
      }
    }
  }

  // No provider available or both providers returned effectively identical content
  return original;
}

export function aiProviderAvailable(): boolean {
  return Boolean(OPENAI_API_KEY || DEEPL_API_KEY);
}
