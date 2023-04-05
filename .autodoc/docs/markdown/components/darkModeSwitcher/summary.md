[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/darkModeSwitcher)

The `DarkModeSwitcher.tsx` file contains the `DarkModeSwitch` component, which is responsible for toggling between light and dark mode in the ergoweb project. This component can be used in any part of the project where a dark mode switch is needed.

The component uses the `useTheme` hook from the `next-themes` library to get the current theme and set the theme when the switch is toggled. It also uses the `useLoaded` hook from the `utils` directory to determine when the component has finished loading.

```tsx
import { useTheme } from 'next-themes';
import { useLoaded } from '@/utils';
```

The `DarkModeSwitch` component renders a div that contains a circular button with either a sun or moon icon, depending on the current theme. When the button is clicked, the `toggleSwitch` function is called, which sets the theme to the opposite of the current theme.

```tsx
const toggleSwitch = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

The position of the button in the div is determined by the `useLoaded` hook. If the theme is currently light, the button is positioned at the end of the div, and if the theme is dark, the button is positioned at the beginning of the div.

The `motion` component from the `framer-motion` library is used to animate the button when the theme is toggled. The `spring` object defines the animation properties, including the type of animation, stiffness, and damping.

```tsx
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
```

The `useEffect` hook is used to update the theme and the class of the `documentElement` when the theme is changed. If the theme is light, the `dark` class is removed from the `documentElement`, and if the theme is dark, the `dark` class is added to the `documentElement`.

```tsx
useEffect(() => {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}, [theme]);
```

To use the `DarkModeSwitch` component in your project, simply import it and include it in your JSX:

```tsx
import { DarkModeSwitch } from '@/components/darkModeSwitcher/DarkModeSwitcher';

function MyApp() {
  return (
    <div>
      {/* Your other components */}
      <DarkModeSwitch />
    </div>
  );
}
```

In summary, the `DarkModeSwitch` component provides a simple and intuitive way for users to toggle between light and dark mode in the ergoweb project. It is easily customizable and can be used in any part of the project where a dark mode switch is needed.
