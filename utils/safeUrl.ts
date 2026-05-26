export function safeExternalUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

export function safeInternalPath(path?: string | null): string | null {
  if (!path || typeof path !== 'string') return null;
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  return path;
}

export function safeHref(url?: string | null): string | null {
  return safeExternalUrl(url) || safeInternalPath(url);
}
