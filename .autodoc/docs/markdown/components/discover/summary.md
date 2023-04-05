[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/discover)

The `.autodoc/docs/json/components/discover` folder contains several React components that are part of the Ergoweb project. These components are designed to provide users with various resources and information about the Ergo blockchain platform, as well as ways to interact with it.

1. `DiscoverHero.tsx`: This component renders a section of the Ergoweb project's website that provides users with resources to learn about and interact with the Ergo blockchain platform. It includes buttons linking to the Ergo manifesto, documentation, and a YouTube channel. The component also links to the Ergonaut website for additional resources. Example usage:

   ```jsx
   import DiscoverHero from './DiscoverHero';

   function App() {
     return (
       <div>
         <DiscoverHero />
       </div>
     );
   }
   ```

2. `Documents.tsx`: This component displays a list of documents grouped by section. It can be used to display documentation, research papers, or other types of documents. The component takes an optional `documents` prop, which is an object containing an array of document data. Example usage:

   ```jsx
   import Documents from './Documents';

   function App() {
     return (
       <div>
         <Documents documents={myDocuments} />
       </div>
     );
   }
   ```

3. `ErgoExplorer.tsx`: This component renders a section called "Explore" that provides users with two buttons to interact with the Ergo blockchain. The first button links to the Ergo Explorer, a tool for viewing real-time transaction data, and the second button links to ergo.watch, a website with community-curated metrics. Example usage:

   ```jsx
   import ErgoExplorer from './ErgoExplorer';

   function App() {
     return (
       <div>
         <ErgoExplorer />
       </div>
     );
   }
   ```

4. `FAQ.tsx`: This component renders a Frequently Asked Questions (FAQ) section on a web page. It takes a `faq` prop, which is an array of objects containing question and answer data. The component is responsive and can be styled using CSS. Example usage:

   ```jsx
   import FAQ from './FAQ';

   function App() {
     return (
       <div>
         <FAQ faq={myFaqData} />
       </div>
     );
   }
   ```

5. `GrantsAndBounties.tsx`: This component renders a "Grants & Bounties" section that provides information about contributing to the Ergo ecosystem and potential funding opportunities. It includes buttons for contributing, starting a raffle, and getting in touch. Example usage:

   ```jsx
   import GrantsAndBounties from './GrantsAndBounties';

   function App() {
     return (
       <div>
         <GrantsAndBounties />
       </div>
     );
   }
   ```

These components can be used individually or combined to create a comprehensive Ergo-related website or application. They are designed to be reusable and customizable, with internationalization support and responsive layouts.
