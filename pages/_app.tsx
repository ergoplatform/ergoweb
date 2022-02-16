import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import English from "../content/compiled-locales/en.json";
import Russian from "../content/compiled-locales/ru.json";
import Spanish from "../content/compiled-locales/es.json";
import Portuguese from "../content/compiled-locales/pt.json";
import Italian from "../content/compiled-locales/it.json";
import Chinese from "../content/compiled-locales/zh.json";
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split("-") : ["en"];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case "ru":
        return Russian;
      case "it":
        return Italian;
      case "en":
        return English;
      case "es":
        return Spanish;
      case "pt":
        return Portuguese;
      case "zh":
        return Chinese;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <ThemeProvider attribute="class">
      <IntlProvider
        locale={shortLocale}
        messages={messages}
        onError={() => null}>
        <Component {...pageProps} />
      </IntlProvider>
    </ThemeProvider>
  );
}

export default MyApp
