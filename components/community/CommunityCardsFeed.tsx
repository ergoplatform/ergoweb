import { FormattedMessage } from 'react-intl';
import CommunityCard from './CommunityCard';

const cards = [
  {
    title: <FormattedMessageFixed defaultMessage="Wiki" id="components.communityHero.Wiki.title" />,
    text: (
      <FormattedMessageFixed
        defaultMessage="Your community wiki. Contribute in any language!"
        id="components.communityHero.Wiki.text"
      />
    ),
    icon: 'ErgoWiki',
    url: 'https://ergonaut.space/',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Reddit" id="components.communityHero.Reddit.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Subscribe to our subreddits."
        id="components.communityHero.Reddit.text"
      />
    ),
    icon: 'Reddit',
    url: 'https://www.reddit.com/r/ergonauts/comments/u22yc9/ecosystem_subreddits/',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Discord" id="components.communityHero.Discord.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Join us on Discord!"
        id="components.communityHero.Discord.text"
      />
    ),
    icon: 'Discord',
    url: 'https://discord.gg/ergo-platform-668903786361651200',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Github" id="components.communityHero.Github.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Talk is cheap, here's the code. 100% Open-Source."
        id="components.communityHero.Github.text"
      />
    ),
    icon: 'Github',
    url: 'https://github.com/ergoplatform',
  },
  {
    title: <FormattedMessageFixed defaultMessage="X" id="components.communityHero.X.title" />,
    text: (
      <FormattedMessageFixed
        defaultMessage="Follow us on X."
        id="components.communityHero.X.text"
      />
    ),
    icon: 'X',
    url: 'https://x.com/Ergo_Platform',
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Telegram"
        id="components.communityHero.Telegram.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Come chat to us on Telegram."
        id="components.communityHero.Telegram.text"
      />
    ),
    icon: 'Telegram',
    url: 'https://t.me/Ergo_Chats',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Forum" id="components.communityHero.Discourse.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Join the discussion on the Ergo Forum."
        id="components.communityHero.Discourse.text"
      />
    ),
    icon: 'Discourse',
    url: 'https://www.ergoforum.org/',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Youtube" id="components.communityHero.Youtube.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Subscribe for weekly AMAs, ErgoPulse, and more!"
        id="components.communityHero.Youtube.text"
      />
    ),
    icon: 'Youtube',
    url: 'https://www.youtube.com/c/ErgoPlatform/videos',
  },
];

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

export default function JoinUs() {
  return (
    <div id="JoinUs" className="relative z-10">
      <div className="flex overflow-x-auto space-x-6 mt-8 no-scrollbar pl-4 py-2 xl:py-8 2xl:hidden">
        {cards.map((card: any, i: number) => (
          <CommunityCard
            key={i}
            title={card.title}
            text={card.text}
            icon={card.icon}
            url={card.url}
          />
        ))}
        <div className="w-0.1 flex-shrink-0"></div>
      </div>
      <div className="hidden max-w-[1300px] mx-auto p-4 py-6 2xl:grid overflow-hidden grid-cols-4 grid-rows-2 gap-6">
        {cards.map((card: any, i: number) => (
          <CommunityCard
            key={i}
            title={card.title}
            text={card.text}
            icon={card.icon}
            url={card.url}
          />
        ))}
      </div>
      <div className="max-w-[1300px] text-center mx-auto">
        <p className="text-[#585858] text-sm md:text-lg p-4 mb-0 pb-2" id="ergo-community">
          <FormattedMessage
            defaultMessage="Ergo is a decentralised grassroots platform powered by its community."
            id="components.communitySection.communityHero.text1"
          />
        </p>
        <p className="text-[#585858] text-sm md:text-lg p-4 pt-0" id="ergo-social">
          <FormattedMessage
            defaultMessage="Join us on socials to get involved, check out the"
            id="components.communitySection.communityHero.text2"
          />
          &nbsp;
          <a
            href="https://ergonaut.space/en/Ergo/Contributing"
            target="_blank"
            rel="noreferrer"
            className="underline text-brand-orange"
          >
            <FormattedMessage
              defaultMessage="Contributing"
              id="components.communitySection.communityHero.linkText"
            />
          </a>
          &nbsp;
          <FormattedMessage
            defaultMessage="page for more information"
            id="components.communitySection.communityHero.text3"
          />
        </p>
      </div>
    </div>
  );
}
