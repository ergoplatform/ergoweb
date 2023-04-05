[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/home)

The `.autodoc/docs/json/components/home` folder contains several React components that are responsible for rendering various sections of the ErgoWeb project's homepage. These components showcase the unique features of the Ergo blockchain, display key statistics, and provide users with the latest news and blog posts.

The `Autolykos.tsx` component renders a section about the Proof of Work algorithm used in the Ergo blockchain. It uses the `react-intl` library for internationalization support and a custom `Button` component for linking to the "Get ERG" page. Example usage:

```jsx
import Autolykos from './Autolykos';

function App() {
  return (
    <div>
      <Autolykos />
    </div>
  );
}
```

The `Highlights.tsx` component renders a responsive and interactive slideshow that displays information about the platform's features and values using the Swiper library. Example usage:

```jsx
import Highlights from './Highlights';

function App() {
  return (
    <div>
      <Highlights />
    </div>
  );
}
```

The `HomeHero.tsx` component renders a hero section on the homepage with a title, description, call-to-action button, and a background video. It uses the `react-intl` library for internationalization support. Example usage:

```jsx
import HomeHero from './HomeHero';

function App() {
  return (
    <div>
      <HomeHero />
    </div>
  );
}
```

The `HomeInfo.tsx` component displays key statistics related to the Ergo blockchain using the `react-countup` library for animating the counting up of the statistics. Example usage:

```jsx
import HomeInfo from './HomeInfo';

function App() {
  return (
    <div>
      <HomeInfo />
    </div>
  );
}
```

The `News.tsx` component renders the latest news and blog posts using a Swiper carousel. It takes a `news` prop, which is an array of objects containing information about each post. Example usage:

```jsx
import News from './News';

const news = [
  // news objects...
];

function App() {
  return (
    <div>
      <News news={news} />
    </div>
  );
}
```

The `Partners.tsx` component renders a list of partners with their logos and links to their websites. It takes a `partners` prop, which is an array of objects containing information about each partner. Example usage:

```jsx
import Partners from './Partners';

const partners = [
  // partner objects...
];

function App() {
  return (
    <div>
      <Partners partners={partners} />
    </div>
  );
}
```

The `UniqueErgo.tsx` component showcases the unique features of the Ergo blockchain using a set of interactive cards. Example usage:

```jsx
import UniqueErgo from './UniqueErgo';

function App() {
  return (
    <div>
      <UniqueErgo />
    </div>
  );
}
```

The `UsingErg.tsx` component renders a section with four cards that provide information on how to use the Ergo cryptocurrency. Example usage:

```jsx
import UsingErg from './UsingErg';

function App() {
  return (
    <div>
      <UsingErg />
    </div>
  );
}
```

These components work together to create a comprehensive and informative homepage for the ErgoWeb project, providing users with an engaging and informative introduction to the Ergo blockchain platform.
