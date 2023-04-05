[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/pages)

The `.autodoc/docs/json/pages` folder contains various React components and Next.js functions responsible for rendering different pages and handling API requests in the Ergoweb project. These components are organized into separate files and subfolders, making it easy to manage and maintain the codebase.

For example, the `404.tsx` file defines a custom 404 error page that is visually appealing and user-friendly. It uses the Next.js framework and the react-intl library to provide internationalization support and a consistent layout for the error page.

The `_app.tsx` file sets up an internationalization (i18n) system for the Ergoweb project, allowing users to view the website in multiple languages. It also provides analytics tracking using Google Analytics and a theme context using `next-themes`.

The `blog.tsx` file renders a blog page that fetches data from an external API and displays the data using the `BlogPosts` component and a list of categories. The component can be customized by passing in different sets of data as props.

The `community.tsx` file renders the community page of the Ergoweb project, displaying the latest blog posts and team members from the Strapi API. It uses the `getServerSideProps` function to fetch data and pass it as props to the `Community` component.

The `discover.tsx` file renders a page for discovering information related to the Ergo blockchain project. It fetches documents and FAQs from the Strapi API based on the user's locale and returns them as props to the `Discover` component.

The `ecosystem.tsx` file renders the main page of the ecosystem section of the Ergoweb project. It imports and conditionally renders several child components based on the presence of certain props and fetches data for these props using the `getServerSideProps` function.

The `get-erg.tsx` file renders the "Get ERG" page of the Ergoweb project, displaying information about wallets that support ERG, mining ERG, and exchanges where ERG can be traded. The `getStaticProps` function fetches data from several APIs and passes them as props to the `GetErg` component.

The `index.tsx` file defines the homepage of the Ergoweb project, displaying recent blog posts, project partners, and blockchain information. The `getStaticProps` function fetches data from various APIs and passes it as props to the `Home` component.

The `legal.tsx` file renders a reusable legal page for the Ergoweb project that can be easily translated into different languages using the react-intl library. The component can be used by importing it into other pages or components and rendering it as a standalone page or as part of a larger application.

The `news.tsx` file renders individual blog posts in the Ergoweb project, allowing users to view and share individual blog posts. The `getServerSideProps` function fetches the current post and a list of all blog posts from a Strapi API.

In summary, the `.autodoc/docs/json/pages`
