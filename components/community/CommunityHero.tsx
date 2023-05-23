import { FormattedMessage } from 'react-intl';

export default function CommunityHero() {
  return (
    <div id="CommunityHero" className="max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="">
        <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858]">
          <FormattedMessage
            defaultMessage="GRASSROOTS FINANCE"
            id="components.communityHero.subtitle"
          />
        </p>
      </div>
      <b>
        <h1 className="max-w-xs leading-tight">
          <FormattedMessage id="components.communityHero.title" defaultMessage="Community" />
        </h1>
      </b>
    </div>
  );
}
