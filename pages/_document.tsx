import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import Script from 'next/script';

interface MyDocumentProps {
  nonce?: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    let nonce: string | undefined = undefined;
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd && ctx.res) {
      // Generate a per-request nonce and emit a strict CSP using nonce + hashes for known inline snippets
      const { randomBytes } = require('crypto');
      nonce = randomBytes(16).toString('base64');

      const scriptSrc = [
        "'self'",
        'https://www.googletagmanager.com',
        'https://www.chatbase.co',
        `'nonce-${nonce}'`,
        // Hash allowlist for library-injected inline snippets (e.g., next-themes bootstrap)
        "'sha256-093d+vtH+OHIgyXLcNMLoGeByLr4mEJGxiWAmmxu6wQ='",
        "'sha256-DmaSgYPE5FfEKERe1Y3VYd1hU2UwG2caX86ctq1rurc='",
        "'sha256-6KEegGsfUVS5KAbYs28muZnRfUqd/ICkAjGAclZ4YUE='",
      ].join(' ');

      const csp = [
        "default-src 'self'",
        `script-src ${scriptSrc}`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https://storage.googleapis.com https://www.googletagmanager.com",
        "media-src 'self' blob:",
        "connect-src 'self' https://api.ergoplatform.com https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app https://storage.googleapis.com https://region1.google-analytics.com https://www.google-analytics.com https://www.chatbase.co",
        "frame-src 'self' https://docs.google.com",
        "font-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ');

      ctx.res.setHeader('Content-Security-Policy', csp);
    }

    return { ...initialProps, nonce };
  }

  render() {
    const nonce = (this.props as any).nonce as string | undefined;

    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          {/* Expose nonce for client-side script usage as a last resort fallback */}
          <meta name="csp-nonce" content={nonce || ''} />
          {/* Set theme class before first paint to avoid dark/light swaps causing CLS */}
          <Script src="/theme-init.js" strategy="beforeInteractive" nonce={nonce} />
          <link
            rel="preconnect"
            href="https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app"
            crossOrigin=""
          />
          <link rel="dns-prefetch" href="https://storage.googleapis.com" />
          <link
            rel="preload"
            href="/fonts/Vinila-Rg-Ex.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Vinila-Bd-Ex.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Vinila-Lt-Ex.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/roboto-v29-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
