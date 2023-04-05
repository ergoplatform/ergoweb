[View code on GitHub](https://github.com/ergoplatform/ergoweb/components/Navigation.tsx)

The `Navigation` component in this code file is responsible for rendering the main navigation menu of the Ergoweb project. It includes a logo, navigation buttons, language switcher, dark mode switcher, and a search component. The navigation menu is responsive and adapts to different screen sizes.

The component accepts an optional `enableLanguages` prop, which is set to `true` by default. If set to `false`, the language switcher will not be rendered.

The navigation menu consists of four main sections: Ergo Community, Get ERG, Discover, and Ecosystem. Each section has its own set of buttons, which are created using the `Button` component. The `pathname` variable is used to determine if the current page matches the button's URL, and if so, an underline is added to the button.

The language switcher and dark mode switcher are rendered using the `LanguageSwitcher` and `DarkModeSwitch` components, respectively. The `Search` component is also included in the navigation menu.

The navigation menu uses the `Popover` component from the `@headlessui/react` library to create a responsive menu that adapts to different screen sizes. The `Transition` component is used to animate the menu's appearance and disappearance when the screen size changes.

The navigation menu also includes social media icons and links to external resources, such as the Ergo GitHub repository, Twitter, YouTube, Telegram, Discord, Reddit, and Discourse.

Here's an example of how to use the `Navigation` component:

```jsx
import Navigation from './Navigation';

function App() {
  return (
    <div>
      <Navigation />
      {/* Other components */}
    </div>
  );
}

export default App;
```

In summary, the `Navigation` component is responsible for rendering the main navigation menu of the Ergoweb project, including the logo, navigation buttons, language switcher, dark mode switcher, and search component. The menu is responsive and adapts to different screen sizes.
## Questions: 
 1. **Question:** What is the purpose of the `enableLanguages` prop in the `Navigation` component?
   **Answer:** The `enableLanguages` prop is used to conditionally render the `LanguageSwitcher` component. If `enableLanguages` is set to `true`, the `LanguageSwitcher` component will be displayed, otherwise, it will not be rendered.

2. **Question:** How does the `Navigation` component handle the active state of the navigation buttons?
   **Answer:** The active state of the navigation buttons is determined by comparing the `pathname` from the `useRouter()` hook with the `url` prop of each `Button` component. If they match, the `underline` prop is set to `true`, which adds an underline style to the active button.

3. **Question:** How does the `DarkModeSwitch` component work in the `Navigation` component?
   **Answer:** The `DarkModeSwitch` component is responsible for toggling the dark mode theme on and off. It uses the `theme` and `setTheme` values from the `useTheme()` hook to manage the current theme state and update it accordingly when the switch is toggled.