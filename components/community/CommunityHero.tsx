import { FormattedMessage } from 'react-intl';

export default function CommunityHero() {
  return (
    <div id="CommunityHero" className="max-w-[1300px] mx-auto p-4 relative z-10 mt-8">
      <div className="">
        <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858] mb-2 md:mb-3">
          <FormattedMessage
            defaultMessage="GRASSROOTS FINANCE"
            id="components.communityHero.subtitle"
          />
        </p>
      </div>
      <b>
        <h1 className="text-black dark:text-white text-[56px] md:text-[80px] lg:text-[96px]">
          <FormattedMessage id="components.communityHero.title" defaultMessage="Community" />
        </h1>
      </b>
    </div>
  );
}
