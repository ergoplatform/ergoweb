[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/shared)

The `.autodoc/docs/json/components/shared` folder contains reusable React components for the Ergo project. These components are designed to be used in various parts of the application, providing a consistent look and feel across the project.

1. **ContributeForm.tsx**: This component renders a form for users to contribute to the Ergo project. It handles internationalization using `react-intl` and displays toast messages using `react-toastify`. The form includes inputs for the user's name, email, and message, as well as buttons linking to resources related to contributing to the project. The `sendMessage` function sends a POST request to a Strapi API endpoint when the form is submitted. Example usage:

```jsx
import ContributeForm from './ContributeForm';

function ContributePage() {
  return (
    <div>
      <h1>Contribute to Ergo</h1>
      <ContributeForm />
    </div>
  );
}
```

2. **Feed.tsx**: This component renders a list of `Post` components, creating a feed of blog posts. It takes an optional `posts` prop, which is an array of post data. If no `posts` prop is provided, the feed will be empty. The component maps over the `data` property of the `posts` array and renders a `Post` component for each post. Example usage is provided in the summary above.

3. **Post.tsx**: This component renders a blog post, taking in various props such as `id`, `title`, `subtitle`, `author`, `date`, `image`, `tags`, `url`, `type`, `content`, `permalink`, `blogPhoto`, and `authorPhoto`. The component handles the logic of rendering the post's image and tags. It can be used to render individual blog posts on a blog page. Example usage is provided in the summary above.

These components work together to create a cohesive user experience for the Ergo project. For example, the `Feed` component can be used to render a list of blog posts on a blog page, while the `Post` component can be used to render individual blog posts with their respective images and tags. The `ContributeForm` component can be used on a separate page to allow users to contribute to the project and access relevant resources. By reusing these components across the application, developers can ensure a consistent look and feel while reducing code duplication.
