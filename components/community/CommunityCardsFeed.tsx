import { FormattedMessage } from "react-intl";
import CommunityCard from "./CommunityCard";

const cards = [
    { title: <FormattedMessageFixed defaultMessage="Ergonaut" id="components.communityHero.Ergonaut.title" />, text: <FormattedMessageFixed defaultMessage="Community-run wiki that anyone can contribute to in any language." id="components.communityHero.Ergonaut.text" />, icon: 'Ergonaut' },
    { title: <FormattedMessageFixed defaultMessage="Reddit" id="components.communityHero.Reddit.title" />, text: <FormattedMessageFixed defaultMessage="Join us on Reddit for live forums and daily content." id="components.communityHero.Reddit.text" />, icon: 'Reddit' },
    { title: <FormattedMessageFixed defaultMessage="Discord" id="components.communityHero.Discord.title" />, text: <FormattedMessageFixed defaultMessage="Have a contribution for Ergo Platform? Join us on Discord!" id="components.communityHero.Discord.text" />, icon: 'Discord' },
    { title: <FormattedMessageFixed defaultMessage="Github" id="components.communityHero.Github.title" />, text: <FormattedMessageFixed defaultMessage="Explore our development community on Github." id="components.communityHero.Github.text" />, icon: 'Github' },
    { title: <FormattedMessageFixed defaultMessage="Twitter" id="components.communityHero.Twitter.title" />, text: <FormattedMessageFixed defaultMessage="Follow Ergo Platform on Twitter." id="components.communityHero.Twitter.text" />, icon: 'Twitter' },
    { title: <FormattedMessageFixed defaultMessage="Telegram" id="components.communityHero.Telegram.title" />, text: <FormattedMessageFixed defaultMessage="Join us in our Telegram community to receive exclusive content and news." id="components.communityHero.Telegram.text" />, icon: 'Telegram' },
    { title: <FormattedMessageFixed defaultMessage="WeChat" id="components.communityHero.WeChat.title" />, text: <FormattedMessageFixed defaultMessage="Send a message for us on WeChat." id="components.communityHero.WeChat.text" />, icon: 'WeChat' },
    { title: <FormattedMessageFixed defaultMessage="Youtube" id="components.communityHero.Youtube.title" />, text: <FormattedMessageFixed defaultMessage="Subscribe to the official YouTube channel of Ergo blockchain." id="components.communityHero.Youtube.text" />, icon: 'Youtube' },
]

function FormattedMessageFixed(props: any) {
    return <FormattedMessage {...props} />;
}

export default function CommunityCardsFeed() {
    return (
        <div>
            <div className="flex overflow-x-auto space-x-6 mt-8 no-scrollbar ml-4 py-4 xl:py-8 2xl:hidden">
                {cards.map((card: any, i: number) => (
                    <CommunityCard key={card.title} title={card.title} text={card.text} icon={card.icon} />
                ))}
                <div className="w-0.1 flex-shrink-0"></div>
            </div>
            <div className="hidden max-w-[1300px] mx-auto p-4 2xl:grid overflow-hidden grid-cols-4 grid-rows-2 gap-6">
                {cards.map((card: any, i: number) => (
                    <CommunityCard key={card.title} title={card.title} text={card.text} icon={card.icon} />
                ))}
            </div>
        </div>
    );
}
