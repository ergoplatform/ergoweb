[View code on GitHub](https://github.com/ergoplatform/ergoweb/.autodoc/docs/json/components/community)

The `community` folder contains components related to displaying information about the Ergo community, its members, and resources. These components can be used together to create a comprehensive community section on the Ergoweb website.

### CommunityCard.tsx

`CommunityCard` is a reusable card component that displays a title, icon, text, and a link to an external URL. It can be used to create cards for various community resources, such as social media pages or forums.

Example usage:

```jsx
<CommunityCard
  title="Join our Discord server"
  icon="discord"
  text="Connect with other members of our community on Discord."
  url="https://discord.gg/example"
/>
```

### CommunityCardsFeed.tsx

`JoinUs` is a component that renders a section with links to social media platforms and community resources related to the Ergo blockchain platform. It uses the `CommunityCard` component to display each link card.

Example usage:

```jsx
import JoinUs from './JoinUs';

function App() {
  return (
    <div>
      <h1>Welcome to the Ergo Community!</h1>
      <JoinUs />
    </div>
  );
}
```

### CommunityHero.tsx

`CommunityHero` is a simple component that renders a section of a webpage with a localized subtitle and a heading. It can be used as part of a larger community page.

Example usage:

```jsx
import CommunityHero from './CommunityHero';

function CommunityPage() {
  return (
    <div>
      <CommunityHero />
      {/* other community page content */}
    </div>
  );
}
```

### ErgoFoundation.tsx

`ErgoFoundation` is a component that displays information about the Ergo Foundation and its goals. It can be used as a standalone section or as part of a larger page about the Ergo Platform.

### HallOfFame.tsx

`HallOfFame` is a component that showcases people involved in the Ergo project and their contributions. It displays a tabbed interface with different groups of people and uses the `HallOfFamePerson` component to display information about each person.

### OurMission.tsx

`OurMission` is a reusable component that displays information about the Ergo Foundation's mission. It uses the `FormattedMessage` and `Button` components for easy localization and customization.

### Sigmanauts.tsx

`Sigmanauts` is a component that provides information about the Sigmanaut Training Programme and encourages users to apply. It uses localized text and custom components for accessibility and user-friendliness.

### Spotlight.tsx

`Spotlight` is a reusable component that displays a section promoting blog content. It can be customized by changing the title, subtitle, and button text, as well as the button's appearance and behavior. The component can also be translated into different languages using the `FormattedMessage` components.
