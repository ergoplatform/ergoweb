[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/pages/news)

The `[id].tsx` file in the `.autodoc/docs/json/pages/news` folder is responsible for rendering individual blog posts in the Ergoweb project. It is a React component named `Post` that takes in two props: `post` and `posts`. The `post` prop contains data about the current post, while the `posts` prop contains a list of all blog posts.

The `Post` component imports several dependencies, such as `Layout`, `ReactMarkdown`, `Image`, `Button`, `Link`, and `BlogPosts`. It first checks if the current post has an associated image and sets the `hasImage` and `imageUrl` variables accordingly. The component then renders the blog post content, including the title, author, date, subtitle, and content.

The content is parsed using `ReactMarkdown` and several plugins, such as `remarkGfm`, `remarkBreaks`, and `rehypeRaw`. These plugins enable the use of GitHub-flavored Markdown and raw HTML in the post content. For example, if a post contains the following content:

```markdown
# This is a heading

This is a paragraph with **bold text** and *italic text*.

- This is a list item
- Another list item
```

The `Post` component will render the content with proper formatting, such as headings, paragraphs, bold and italic text, and lists.

At the bottom of the post, there is a "Share post" section containing links to share the post on Facebook and Twitter. These links are wrapped in `Link` components from Next.js, enabling client-side navigation without a full page refresh.

The `Post` component fetches the current post and a list of all blog posts from a Strapi API using the `getServerSideProps` function. If the current post is not found, the component returns a 404 error. Otherwise, it returns the `post` and `posts` props to the `Post` component.

In the larger project, the `Post` component is a crucial part of the blog functionality, allowing users to view and share individual blog posts. For example, when a user navigates to a specific blog post URL (e.g., `/news/1`), the `Post` component will fetch the post data with the corresponding ID and render the post content on the page.
