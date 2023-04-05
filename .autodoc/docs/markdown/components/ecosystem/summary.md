[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/ecosystem)

The `.autodoc/docs/json/components/ecosystem` folder contains several React components that are part of the Ergoweb project. These components are focused on displaying various aspects of the Ergo ecosystem, such as projects, decentralized applications (DApps), and the Ergonaut community-run wiki.

The `ChangingTheWorld.tsx` component renders a Swiper slideshow of projects aimed at changing the world. It takes an optional `chagingTheWorldProjects` prop, which is an array of objects containing information about each project. This component can be used in various parts of the project, such as a homepage or a dedicated projects page.

```jsx
import ChangingTheWorld from './ChangingTheWorld';

const projects = [
  // ...
];

function App() {
  return (
    <div>
      <ChangingTheWorld chagingTheWorldProjects={projects} />
    </div>
  );
}
```

The `DApps.tsx` component renders a list of decentralized applications (DApps) on a web page. It takes an optional `apps` prop, which is an array of objects representing the DApps to be displayed. This component can be used in conjunction with other components to build a larger decentralized application platform.

The `EcosystemHero.tsx` component renders a hero section for the Ergoweb project's ecosystem page. It is likely used as a part of a larger page or layout component that displays information about the Ergoweb ecosystem.

```jsx
import EcosystemHero from './EcosystemHero';

export default function EcosystemPage() {
  return (
    <div>
      <EcosystemHero />
      {/* ... */}
    </div>
  );
}
```

The `Favorites.tsx` component displays a list of favorite posts and information about the ErgoRaffle crowdfunding service. It receives a `favorites` prop, which is an array of post objects. This component provides a user-friendly interface for displaying a list of favorite posts and promoting the ErgoRaffle service.

The `FeaturesAndProjects.tsx` component displays a list of projects with their images, titles, descriptions, and links. It takes an optional `projects` prop, which is an array of objects representing each project. This component can be used in various parts of the Ergoweb project, such as the homepage or a dedicated projects page.

The `Roadmap.tsx` component renders a roadmap view of the Ergo project. It takes a single prop `roadmapItems`, which is an array of objects containing information about the roadmap items. This component provides a high-level view of the Ergo project roadmap and allows users to easily navigate through the different sections and items.

The `Wiki.tsx` component renders a section of the Ergoweb project's website called "Wiki". It displays information about the Ergonaut community-run wiki and encourages users to explore and learn more about the Ergo blockchain.

```jsx
import Wiki from './path/to/Wiki';

function App() {
  return (
    <div>
      <Wiki />
    </div>
  );
}
```

These components work together to create a comprehensive view of the Ergo ecosystem, providing users with valuable information and resources. They can be used in various parts of the Ergoweb project to build a larger application that showcases the different aspects of the Ergo ecosystem.
