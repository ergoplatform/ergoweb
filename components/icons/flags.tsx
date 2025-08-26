import React from 'react';

type FlagProps = {
  code: 'gb' | 'de' | 'it' | 'hu' | 'ru' | 'cn' | 'id' | 'tr' | 'es' | 'pl' | 'pt' | 'sk' | string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
};

export function Flag({ code, title, className = '', width = 18, height = 12 }: FlagProps) {
  const label = title ?? `${code.toUpperCase()} flag`;

  // Normalize to lowercase
  const c = (code || '').toLowerCase();

  if (c === 'de') {
    // Germany: Black / Red / Gold (horizontal)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#000000" />
        <rect y="4" width="18" height="4" fill="#DD0000" />
        <rect y="8" width="18" height="4" fill="#FFCE00" />
      </svg>
    );
  }

  if (c === 'it') {
    // Italy: Green / White / Red (vertical)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="6" height="12" x="0" fill="#009246" />
        <rect width="6" height="12" x="6" fill="#FFFFFF" />
        <rect width="6" height="12" x="12" fill="#CE2B37" />
      </svg>
    );
  }

  if (c === 'hu') {
    // Hungary: Red / White / Green (horizontal)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="4" y="0" fill="#CD2A3E" />
        <rect width="18" height="4" y="4" fill="#FFFFFF" />
        <rect width="18" height="4" y="8" fill="#436F4D" />
      </svg>
    );
  }

  if (c === 'ru') {
    // Russia: White / Blue / Red (horizontal)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="4" y="0" fill="#FFFFFF" />
        <rect width="18" height="4" y="4" fill="#0039A6" />
        <rect width="18" height="4" y="8" fill="#D52B1E" />
      </svg>
    );
  }

  if (c === 'id') {
    // Indonesia: Red (top) / White (bottom)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="6" y="0" fill="#CE1126" />
        <rect width="18" height="6" y="6" fill="#FFFFFF" />
      </svg>
    );
  }

  if (c === 'tr') {
    // Turkey: Red background, white crescent and star (simplified)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#E30A17" />
        {/* Crescent */}
        <circle cx="7" cy="6" r="3" fill="#FFFFFF" />
        <circle cx="8" cy="6" r="2.2" fill="#E30A17" />
        {/* Star (simple 5-point) */}
        <path
          d="M12.8 6l1.1 0.35-0.8 0.8 0.2 1.1-0.95-0.5-0.95 0.5 0.2-1.1-0.8-0.8 1.1-0.35 0.45-1 0.45 1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (c === 'cn') {
    // China: Red background, large yellow star (simplified)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#DE2910" />
        {/* Large star */}
        <path
          d="M3.8 2.2l0.5 1.6h1.7l-1.4 1 0.5 1.6-1.4-1-1.4 1 0.5-1.6-1.4-1h1.7l0.5-1.6z"
          fill="#FFDE00"
        />
      </svg>
    );
  }

  if (c === 'es') {
    // Spain: Red - Yellow - Red (simplified, proportions 1:2:1)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#AA151B" />
        <rect y="3" width="18" height="6" fill="#F1BF00" />
      </svg>
    );
  }

  if (c === 'pl') {
    // Poland: White (top) / Red (bottom)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="6" y="0" fill="#FFFFFF" />
        <rect width="18" height="6" y="6" fill="#D4213D" />
      </svg>
    );
  }

  if (c === 'pt') {
    // Portugal: Green (2/5) / Red (3/5)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#FF0000" />
        <rect width="7.2" height="12" x="0" fill="#006633" />
      </svg>
    );
  }

  if (c === 'sk') {
    // Slovakia: White / Blue / Red (horizontal)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="4" y="0" fill="#FFFFFF" />
        <rect width="18" height="4" y="4" fill="#0B4EA2" />
        <rect width="18" height="4" y="8" fill="#EE1C25" />
      </svg>
    );
  }

  if (c === 'gb' || c === 'uk' || c === 'en') {
    // United Kingdom (approximate Union Jack)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 18 12"
        role="img"
        aria-label={label}
        className={className}
      >
        <rect width="18" height="12" fill="#012169" />
        {/* Diagonal white */}
        <polygon points="0,0 2,0 18,8 18,10 16,10 0,2" fill="#FFFFFF" />
        <polygon points="18,0 16,0 0,8 0,10 2,10 18,2" fill="#FFFFFF" />
        {/* Diagonal red */}
        <polygon points="0,0 1.2,0 18,7.2 18,8.4 16.8,8.4 0,1.2" fill="#C8102E" />
        <polygon points="18,0 16.8,0 0,7.2 0,8.4 1.2,8.4 18,1.2" fill="#C8102E" />
        {/* Central white cross */}
        <rect x="0" y="5" width="18" height="2" fill="#FFFFFF" />
        <rect x="8" y="0" width="2" height="12" fill="#FFFFFF" />
        {/* Central red cross */}
        <rect x="0" y="5.5" width="18" height="1" fill="#C8102E" />
        <rect x="8.5" y="0" width="1" height="12" fill="#C8102E" />
      </svg>
    );
  }

  // Default: neutral placeholder
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 12"
      role="img"
      aria-label={label}
      className={className}
    >
      <rect width="18" height="12" fill="#9CA3AF" />
    </svg>
  );
}

export default Flag;
