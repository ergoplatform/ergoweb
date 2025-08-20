import "../styles/globals.scss";
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: '375px',
      height: '640px',
    },
  },
  sm: {
    name: 'sm',
    styles: {
      width: '640px',
      height: '960px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '768px',
      height: '963px',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  xl: {
    name: 'xl',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  xl2: {
    name: 'xl2',
    styles: {
      width: '1536px',
      height: '864px',
    },
  },

};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  locales: {
    en: 'English',
    es: 'Spanish',
    pt: 'Portuguese',
    ru: 'Russian',
    tr: 'Turkish',
  },
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports,
    defaultViewport: 'xl',
  },
  // nextRouter: {
  //   Provider: RouterContext.Provider,
  // },
}
