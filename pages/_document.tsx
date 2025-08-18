import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{
                var d=document.documentElement;
                var t=localStorage.getItem('theme');
                if(t==='dark'){ d.classList.add('dark'); d.style.colorScheme='dark'; }
                else{ d.classList.remove('dark'); d.style.colorScheme='light'; }
              }catch(e){}})();`,
            }}
          />
          <link
            rel="preconnect"
            href="https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="" />
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
          <link rel="preload" as="image" href="/assets/home/frame-3.png" />
          <link rel="preload" as="image" href="/assets/home/frame-3-light.png" />
        </Head>
        <body>
          {process.env.NODE_ENV === 'production' && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
          )}
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && (
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTM_ID}');`,
              }}
            />
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
