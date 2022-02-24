import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Button";

export default function ContributeForm() {
    const intl = useIntl();
    const buttonReportBugs = intl.formatMessage({ id: 'components.Sigmanauts.button.reportBugs', defaultMessage: 'REPORT BUGS' });
    const buttonWriteAndReviewCode = intl.formatMessage({ id: 'components.Sigmanauts.button.writeAndReviewCode', defaultMessage: 'WRITE & REVIEW CODE' });
    const buttonDiscord = intl.formatMessage({ id: 'components.Sigmanauts.button.discord', defaultMessage: 'VISIT THE DISCORD CHANNEL' });
    const buttonGrantsAndBounties = intl.formatMessage({ id: 'components.Sigmanauts.button.grantsAndBounties', defaultMessage: 'GRANTS & BOUNTIES' });
    const formName = intl.formatMessage({ id: 'components.Sigmanauts.formInput.name', defaultMessage: 'Name / Company' });
    const formEmail = intl.formatMessage({ id: 'components.Sigmanauts.formInput.email', defaultMessage: 'E-Mail' });
    const formText = intl.formatMessage({ id: 'components.Sigmanauts.formInput.text', defaultMessage: 'Write us your suggestions and ideas, let’s talk!' });
    const formButton = intl.formatMessage({ id: 'components.Sigmanauts.formInput.button', defaultMessage: 'SEND' });
    return (
        <div className="max-w-[1300px] mx-auto px-4">
            <div className="flex flex-col mb-20 lg:flex-row lg:justify-around">
                <h1 className="block-inline font-vinila-extended text-[48px] lg:text-[120px] mb-6 lg:mt-auto lg:mb-auto"><b><FormattedMessage defaultMessage="Contribute" id="components.ContributeForm.title" /></b></h1>
                <p className="text-[#989898] dark:text-[#989898] w-56 lg:w-72 lg:mt-auto lg:mb-auto"><FormattedMessage defaultMessage="Ergo operates an open contributor model where <b>anyone is welcome to contribute.</b>" id="components.ContributeForm.text" values={{ b: (...chunks: any) => <b>{chunks}</b> }} /></p>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col">
                    <h3 className="mb-4 lg:leading-none"><FormattedMessage defaultMessage="I am a <b>developer</b>" id="components.ContributeForm.developer.title" values={{ b: (...chunks: any) => <b>{chunks}</b> }} /></h3>
                    <p className="font-robot text-[14px] lg:text-[20px] text-[#989898] dark:text-[#989898] mb-8"><b>
                        <FormattedMessage defaultMessage="HOW CAN I CONTRIBUTE?" id="components.ContributeForm.developer.subTitle" />
                    </b></p>
                    <div>
                        <div className="ml-8 mb-10"><Button text={buttonReportBugs} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
                        <div className="ml-8 mb-10"><Button text={buttonWriteAndReviewCode} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
                        <div className="ml-8 mb-10"><Button text={buttonDiscord} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
                        <div className="ml-8 mb-10"><Button text={buttonGrantsAndBounties} url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h3 className="mb-4 lg:leading-none"><FormattedMessage defaultMessage="I am a <b>company</b>" id="components.ContributeForm.company.title" values={{ b: (...chunks: any) => <b>{chunks}</b> }} /></h3>
                    <p className="font-robot text-[14px] lg:text-[20px] text-[#989898] dark:text-[#989898] mb-10"><FormattedMessage defaultMessage="WANT TO BECOME A PARTNER?" id="components.ContributeForm.company.subTitle" /></p>
                    <input className="mb-6 px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow" placeholder={formName} />
                    <input className="mb-6 px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow" placeholder={formEmail} />
                    <textarea rows={4} className="px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow" placeholder={formText} />
                    <div className="mt-8 lg:mt-6">
                        <div className="float-right"><Button text={formButton} textColor="black" url="/discover" newTab={false} underline={false} background={true} iconColor="black" icon="ArrowRight" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
