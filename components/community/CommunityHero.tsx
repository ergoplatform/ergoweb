import { FormattedMessage } from "react-intl";

const plat = [
    { name: <FormattedMessageFixed defaultMessage="Ergonaut" id="components.communityHero.1.title" />, text: '', icon: 'Ergonaut'},
    { name: '', text: '' },
    { name: '', text: '' },
    { name: '', text: '' },
    { name: '', text: '' },
    { name: '', text: '' },
]

function FormattedMessageFixed(props: any) {
    return <FormattedMessage {...props} />;
}


export default function CommunityHero() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="">
                <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858]"><FormattedMessage defaultMessage="HIGHLIGHTS" id="components.highlights.title" /></p>
            </div>
            <h1>Community</h1>
            <div className="grid grid-rows-1">
                <div></div>
            </div>

        </div>
    );
}
