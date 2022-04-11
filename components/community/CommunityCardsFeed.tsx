import { FormattedMessage } from "react-intl";
import CommunityCard from "./CommunityCard";

const cards = [
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Wiki"
        id="components.communityHero.Ergonaut.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Community-run wiki that anyone can contribute to in any language."
        id="components.communityHero.Ergonaut.text"
      />
    ),
    icon: "ErgoWiki",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Reddit"
        id="components.communityHero.Reddit.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Join us at r/ergonauts"
        id="components.communityHero.Reddit.text"
      />
    ),
    icon: "Reddit",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Discord"
        id="components.communityHero.Discord.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Have a contribution for Ergo Platform? Join us on Discord!"
        id="components.communityHero.Discord.text"
      />
    ),
    icon: "Discord",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Github"
        id="components.communityHero.Github.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Talk is cheap, here's the code. 100% Open-Source."
        id="components.communityHero.Github.text"
      />
    ),
    icon: "Github",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Twitter"
        id="components.communityHero.Twitter.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Follow the Ergo Platform Twitter."
        id="components.communityHero.Twitter.text"
      />
    ),
    icon: "Twitter",
    url: "https://google.com",
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
    icon: "Telegram",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Forum"
        id="components.communityHero.Discourse.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Join the discussion on the Ergo Forum."
        id="components.communityHero.Discourse.text"
      />
    ),
    icon: "Discourse",
    url: "https://google.com",
  },
  {
    title: (
      <FormattedMessageFixed
        defaultMessage="Youtube"
        id="components.communityHero.Youtube.title"
      />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Don't forget to Like and Subscribe"
        id="components.communityHero.Youtube.text"
      />
    ),
    icon: "Youtube",
    url: "https://google.com",
  },
];

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

export default function CommunityCardsFeed() {
  return (
    <div className="relative z-10">
        <div className="flex overflow-x-auto space-x-6 mt-8 no-scrollbar pl-4 py-6 xl:py-8 2xl:hidden">
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
      <div className="hidden max-w-[1300px] mx-auto p-4 2xl:grid overflow-hidden grid-cols-4 grid-rows-2 gap-6">
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
    </div>
  );
}
