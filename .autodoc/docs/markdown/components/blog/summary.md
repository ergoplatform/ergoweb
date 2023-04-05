[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/blog)

The `.autodoc/docs/json/components/blog` folder contains three React components that are used to display different types of content on a blog page, such as news posts, blog posts, and media posts. These components are designed to be reusable and can be imported into other parts of the project as needed.

1. **BlogNews.tsx**: This component displays a list of news posts with infinite scrolling functionality. It fetches more news posts from an API endpoint as the user scrolls down the page. The `BlogNews` component takes in a `news` prop, which is an array of news post objects. It uses the `NewsPost` child component to render each post with its title, subtitle, date, and a link to the full post. The `InfiniteScroll` component from the `react-infinite-scroll-component` library is used to implement the infinite scrolling feature. Example usage:

   ```jsx
   import BlogNews from './BlogNews';

   function NewsPage() {
     const newsPosts = [
       // Array of news post objects
     ];

     return (
       <div>
         <BlogNews news={newsPosts} />
       </div>
     );
   }
   ```

2. **BlogPosts.tsx**: This component displays a list of blog posts with infinite scrolling and filtering capabilities. It takes in a `data` prop, which is an array of blog post objects, an optional `locale` prop for specifying the language of the posts, and a `filter` prop for filtering the posts by category or tag. The `InfiniteScroll` component is used to load more posts as the user scrolls down the page. The `Post` child component is used to render each post with its title, date, and other attributes. Example usage:

   ```jsx
   import BlogPosts from './BlogPosts';

   function BlogPage() {
     const blogPosts = [
       // Array of blog post objects
     ];

     return (
       <div>
         <BlogPosts data={blogPosts} locale="en" filter={{ category: 'tech' }} />
       </div>
     );
   }
   ```

3. **Media.tsx**: This component renders a list of media posts, such as articles or interviews about the project. It takes in a `mediaPosts` prop, which is an array of media post objects. The `MediaPost` child component is used to render each post with its title, description, date, and a link to the full post. The `FormattedDate` component from the `react-intl` library is used to format the date of the post. Example usage:

   ```jsx
   import Media from './Media';

   function MediaPage() {
     const mediaPosts = [
       // Array of media post objects
     ];

     return (
       <div>
         <Media mediaPosts={mediaPosts} />
       </div>
     );
   }
   ```

These components can be used together or separately to create a blog page or display related content on other pages of the project. They provide a flexible and modular way to manage and display different types of content with various features, such as infinite scrolling, filtering, and localization.
