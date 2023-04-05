[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/stories/components/home)

The `components/home` folder in the `ergoweb` project contains Storybook stories for various React components that are likely used on the home page of the application. These stories allow developers to develop, test, and showcase the components in isolation using the Storybook tool.

1. **AutolykosComponent**: This component is defined in `autolykos.stories.jsx` and is used to display information about the project or showcase a particular feature. The `Dark` component provides a consistent dark background for the `Autolykos` component.

   Example usage:
   ```jsx
   import AutolykosComponent from './components/home/AutolykosComponent';

   function HomePage() {
     return (
       <div>
         <h1>Welcome to Ergoweb</h1>
         <AutolykosComponent title="About Ergoweb" description="Learn more about our project" />
       </div>
     );
   }
   ```

2. **HighlightsComponent**: Defined in `highlights.stories.jsx`, this component is used to display highlights or featured content on the home page. The `Dark` component provides a contrasting dark background for the highlights.

   Example usage:
   ```jsx
   import { HighlightsComponent } from 'ergoweb';

   function HomePage() {
     return (
       <div>
         <h1>Welcome to ErgoWeb</h1>
         <HighlightsComponent 
           title="New Product Launch"
           description="Check out our latest product and get 10% off your first purchase!"
           image="https://example.com/product-image.jpg"
         />
       </div>
     );
   }
   ```

3. **HomeHeroComponent**: This component is documented in `homeHero.stories.jsx` and is used to display a hero section on the home page. The `Dark` decorator provides a dark background for the `HomeHero` component in Storybook.

   Example usage:
   ```jsx
   import { HomeHeroComponent } from 'ergoweb';

   function HomePage() {
     return (
       <div>
         <h1>Welcome to ErgoWeb</h1>
         <HomeHeroComponent title="Discover ErgoWeb" description="Explore our innovative solutions" />
       </div>
     );
   }
   ```

4. **HomeInfoComponent**: Defined in `homeInfo.stories.jsx`, this component is used to display informational content on the home page. The `Dark` component provides a dark background for the `HomeInfo` component.

   Example usage:
   ```jsx
   import { HomeInfoComponent } from 'ergoweb';

   <HomeInfoComponent 
     title="Welcome to ErgoWeb"
     description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu bibendum bibendum, velit sapien sodales sapien, vel commodo elit elit vel elit."
   />
   ```

5. **NewsComponent**: This component is documented in `news.stories.jsx` and is used to display news articles on the home page. The `Dark` component provides a dark background for the `News` component, and the `getServerSideProps` function is used to load news data.

   Example usage:
   ```jsx
   import { NewsComponent } from 'ergoweb';

   <NewsComponent loaded={{ news: [{ title: 'Breaking News', content: 'Lorem ipsum dolor sit amet.' }] }} />
   ```

These components and their stories provide a modular and reusable structure for the home page of the `ergoweb` project. Developers can easily customize and test these components using the provided Storybook stories, ensuring a consistent and maintainable codebase.
