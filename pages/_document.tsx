import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app"
            crossOrigin=""
          />
          <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
