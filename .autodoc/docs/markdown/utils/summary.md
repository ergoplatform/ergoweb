[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/utils)

The `.autodoc/docs/json/utils` folder contains utility functions and components that are used throughout the ErgoWeb project to provide various functionalities such as animations, icon rendering, and RSS feed generation.

`fade-in-section.tsx` is a React component that fades in its child components when they become visible on the screen. It uses the `IntersectionObserver` API to detect when the component enters the viewport. This component can be used to add a subtle animation effect to elements as they become visible on the screen, such as images or text blocks.

Example usage:

```jsx
import FadeInSection from './FadeInSection';

function MyComponent() {
  return (
    <div>
      <FadeInSection>
        <img src="my-image.jpg" alt="My Image" />
      </FadeInSection>
      <FadeInSection>
        <p>Some text that should fade in</p>
      </FadeInSection>
    </div>
  );
}
```

`generateRssFeed.ts` is a function that generates an RSS feed for the Ergo website by fetching the latest blog posts and news articles from the Strapi API, sorting them by date, and adding them to a new `Feed` instance. The generated RSS feed is then written to `feed.xml` and `feed.json` files in the `./public/rss` directory, which can be consumed by RSS readers.

`icons-map.tsx` defines a function called `getIconComponentByName` that returns an SVG icon component based on the name passed as an argument. This function is used throughout the project to render SVG icons in various components.

Example usage:

```jsx
import { getIconComponentByName } from 'ergoweb';

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      {getIconComponentByName('CheckDark', { size: 24 })}
      <p>This is some text.</p>
    </div>
  );
};
```

`useLoaded.ts` is a custom React hook that tracks whether a component has finished loading or not. It uses the `useState` and `useEffect` hooks to update a `loaded` state variable, which can be used by the component to conditionally render content based on the loading status.

Example usage:

```jsx
import React from 'react';
import { useLoaded } from 'ergoweb';

const MyComponent = () => {
  const loaded = useLoaded();

  return (
    <div>
      {loaded ? (
        <p>Component has finished loading!</p>
      ) : (
        <p>Loading component...</p>
      )}
    </div>
  );
};
```

These utilities and components are essential for providing a smooth user experience, managing content updates, and rendering icons throughout the ErgoWeb project.
