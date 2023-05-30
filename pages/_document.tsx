import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.chatbaseConfig = {
                chatbotId: "zxB2uzZfYoHIpA98eTzgM",
              }
            `,
            }}
          />
          <script src="https://www.chatbase.co/embed.min.js" id="zxB2uzZfYoHIpA98eTzgM" defer />
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
