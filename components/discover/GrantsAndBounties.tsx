import { useIntl } from "react-intl";
import Button from "../Button";

export default function GrantsAndBounties() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({ id: 'components.grantsAndBounties.button1', defaultMessage: 'DEV BOUNTIES' });
  const button2Text = intl.formatMessage({ id: 'components.grantsAndBounties.button2', defaultMessage: 'GRANTS' });
  const button3Text = intl.formatMessage({ id: 'components.grantsAndBounties.button3', defaultMessage: 'BUG BOUNTIES' });

  return (
    <div className="max-w-[1300px] mx-auto p-4 mt-40">
      <h1 className="leading-tight xl:ml-72"><b>Grants & Bounties</b></h1>
      <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6 xl:mt-24 xl:ml-[600px] xl:max-w-lg">We are looking to fund grants for projects that focus on building key ecosystem infrastructure. The proposals, at the moment, need to be approved by four of six votes of Ergo Development Fund Board Members. Please reference this article for scoping your own grant, and send it to team@ergoplatform.org.</p>
      <div className="flex flex-col xl:flex-row xl:ml-[600px]">
        <div className="-ml-4 mt-10"><Button text={button1Text} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
        <div className="-ml-4 mt-10 xl:ml-16"><Button text={button2Text} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
        <div className="-ml-4 mt-10 xl:ml-16"><Button text={button3Text} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
      </div>
    </div>
  );
}
