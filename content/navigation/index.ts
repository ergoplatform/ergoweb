interface INavItem {
  name: string;
  description: string;
  link: string;
}

interface INav {
  list: {
    category: string;
    items: INavItem[];
  }[];
}

export const nav: INav = {
  list: [
    {
      category: 'Explore',
      items: [
        {
          name: 'Ergo token',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Exchanges',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Wallets',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Ecosystem',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Blog',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Ergo Explorer',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Ergo Watch',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
      ],
    },
    {
      category: 'Build',
      items: [
        {
          name: 'Getting started',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Docs',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'GitHub',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Tools',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Grants',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Hackathon',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
      ],
    },
    {
      category: 'Learn',
      items: [
        {
          name: 'About',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Roadmap',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Manifesto',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Use cases',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
      ],
    },
    {
      category: 'Join',
      items: [
        {
          name: 'Community',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
        {
          name: 'Forum',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
          link: '',
        },
      ],
    },
  ],
};
