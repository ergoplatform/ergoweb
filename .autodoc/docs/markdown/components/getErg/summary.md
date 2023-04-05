[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/getErg)

The `.autodoc/docs/json/components/getErg` folder contains React components and related code for displaying information about Ergo, a cryptocurrency, on the Ergoweb project's website. The components in this folder are focused on providing users with resources and tools related to obtaining and using Ergo, such as exchanges, wallets, and mining.

`Exchanges.tsx` is a reusable component that renders a list of exchanges where users can buy, sell, and trade Ergo. It takes an array of exchange objects as a prop and displays each exchange's logo, along with a title, description, and a button linking to a buying guide blog post. The component can be customized by passing in a different array of exchange objects or changing the button's properties.

`GetErgHero.tsx` is a component that renders a hero section for the "Get ERG" page, providing an overview of the different ways users can obtain and use Ergo. It displays a grid of cards, each with a title, text, icon, and URL, representing various methods of obtaining Ergo. The component is reusable and can be used in other pages or components that require a hero section with a grid of cards.

`Mining.tsx` is a component that renders a page with information about mining Ergo, including a list of mining pools and miners, along with additional resources for miners to learn more about Ergo's mining algorithm and community.

`MiningCalculator.tsx` is a component that calculates the daily revenue of mining Ergo based on the user's input of their hashrate. It takes in four props: `currentPrice`, `currentBlockReward`, `networkHashrate`, and `difficulty`. The component provides a simple way for users to calculate their potential daily revenue from mining Ergo based on their hashrate and the current network conditions.

`Wallets.tsx` is a component that renders a list of digital wallets, their features, and related information. It helps users choose the right wallet for their needs and provides them with relevant resources. The component displays a table-like structure with wallet names, features, and supported platforms, grouped into categories like "Community Favorites", "Extra Features", and "Reference Client".

Example usage of `Exchanges.tsx`:

```jsx
import Exchanges from './Exchanges';

const exchanges = [
  {
    id: 1,
    attributes: {
      name: 'Exchange A',
      url: 'https://exchange-a.com',
      image: {
        data: {
          attributes: {
            url: '/images/exchange-a.png',
            width: 100,
            height: 100,
          },
        },
      },
      image_dark: {
        data: {
          attributes: {
            url: '/images/exchange-a-dark.png',
            width: 100,
            height: 100,
          },
        },
      },
    },
  },
  {
    id: 2,
    attributes: {
      name: 'Exchange B',
      url: 'https://exchange-b.com',
      image: {
        data: {
          attributes: {
            url: '/images/exchange-b.png',
            width: 100,
            height: 100,
          },
        },
      },
      image_dark: null,
    },
  },
];

function App() {
  return (
    <div>
      <Exchanges exchanges={exchanges} />
    </div>
  );
}
```

These components work together to provide a comprehensive set of resources and tools for users interested in obtaining and using Ergo. They can be used in various parts of the Ergoweb project to display relevant information and provide a user-friendly interface for interacting with Ergo.
