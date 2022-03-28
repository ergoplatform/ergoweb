import { FormattedMessage, useIntl } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";
import Button from "../Button";

export default function ContributeForm() {
  const intl = useIntl();
  const buttonReportBugs = intl.formatMessage({
    id: "components.Sigmanauts.button.reportBugs",
    defaultMessage: "REPORT BUGS",
  });
  const buttonWriteAndReviewCode = intl.formatMessage({
    id: "components.Sigmanauts.button.writeAndReviewCode",
    defaultMessage: "WRITE & REVIEW CODE",
  });
  const buttonDiscord = intl.formatMessage({
    id: "components.Sigmanauts.button.discord",
    defaultMessage: "VISIT THE DISCORD CHANNEL",
  });
  const buttonGrantsAndBounties = intl.formatMessage({
    id: "components.Sigmanauts.button.grantsAndBounties",
    defaultMessage: "GRANTS & BOUNTIES",
  });
  const formName = intl.formatMessage({
    id: "components.Sigmanauts.formInput.name",
    defaultMessage: "Name / Company",
  });
  const formEmail = intl.formatMessage({
    id: "components.Sigmanauts.formInput.email",
    defaultMessage: "E-Mail",
  });
  const formText = intl.formatMessage({
    id: "components.Sigmanauts.formInput.text",
    defaultMessage: "Write us your suggestions and ideas, let’s talk!",
  });
  const formButton = intl.formatMessage({
    id: "components.Sigmanauts.formInput.button",
    defaultMessage: "SEND",
  });

  const sendMessage = async (event: any) => {
    event.preventDefault();

    // const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + '/api/contact-requests', {
    //     body: JSON.stringify({
    //         data: {
    //             name: event.target.name.value,
    //             text: event.target.text.value,
    //             email: event.target.email.value,
    //         }
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST'
    // })
    // const result = await res.json()
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 relative z-10">
      <div className="flex flex-col mb-20 lg:flex-row lg:justify-around">
        <h1 className="block-inline font-vinila-extended text-[48px] lg:text-[120px] mb-6 lg:mt-auto lg:mb-auto">
          <b>
            <FormattedMessage
              defaultMessage="Contribute"
              id="components.ContributeForm.title"
            />
          </b>
        </h1>
        <p className="text-[#989898] dark:text-[#989898] w-56 lg:w-72 lg:mt-auto lg:mb-auto">
          <FormattedMessage
            defaultMessage="Ergo operates an open contributor model where <b>anyone is welcome to contribute.</b>"
            id="components.ContributeForm.text"
            values={{ b: (...chunks: any) => <b>{chunks}</b> }}
          />
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col">
          <h3 className="mb-4 lg:leading-none">
            <FormattedMessage
              defaultMessage="I am a <b>developer</b>"
              id="components.ContributeForm.developer.title"
              values={{ b: (...chunks: any) => <b>{chunks}</b> }}
            />
          </h3>
          <p className="font-robot text-[14px] lg:text-[20px] text-[#989898] dark:text-[#989898] mb-8">
            <b>
              <FormattedMessage
                defaultMessage="HOW CAN I CONTRIBUTE?"
                id="components.ContributeForm.developer.subTitle"
              />
            </b>
          </p>
          <div>
            <div className="ml-8 mb-10">
              <Button
                text={buttonReportBugs}
                url="/url"
                newTab={true}
                underline={true}
                textColor="brand-orange"
                background={false}
                icon="ArrowRight"
                iconColor="orange"
              />
            </div>
            <div className="ml-8 mb-10">
              <Button
                text={buttonWriteAndReviewCode}
                url="/url"
                newTab={true}
                underline={true}
                textColor="brand-orange"
                background={false}
                icon="ArrowRight"
                iconColor="orange"
              />
            </div>
            <div className="ml-8 mb-10">
              <Button
                text={buttonDiscord}
                url="/url"
                newTab={true}
                underline={true}
                textColor="brand-orange"
                background={false}
                icon="ArrowRight"
                iconColor="orange"
              />
            </div>
            <div className="ml-8 mb-10">
              <Button
                text={buttonGrantsAndBounties}
                url="/url"
                newTab={true}
                underline={true}
                textColor="brand-orange"
                background={false}
                icon="ArrowRight"
                iconColor="orange"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <h3 className="mb-4 lg:leading-none">
            <FormattedMessage
              defaultMessage="I am a <b>company</b>"
              id="components.ContributeForm.company.title"
              values={{ b: (...chunks: any) => <b>{chunks}</b> }}
            />
          </h3>
          <p className="font-robot text-[14px] lg:text-[20px] text-[#989898] dark:text-[#989898] mb-10">
            <FormattedMessage
              defaultMessage="WANT TO BECOME A PARTNER?"
              id="components.ContributeForm.company.subTitle"
            />
          </p>
          <form className="flex flex-col" onSubmit={sendMessage}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mb-6 px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow"
              placeholder={formName}
            />
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              required
              className="mb-6 px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow"
              placeholder={formEmail}
            />
            <textarea
              id="text"
              required
              rows={4}
              className="px-6 py-4 rounded-xl dark:bg-[#303030] input-shadow"
              placeholder={formText}
            />
            <div className="mt-8 lg:mt-6">
              <div className="float-right">
                <button
                  type="submit"
                  className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange"
                >
                  <span>{formButton}</span>
                  <span className="w-4 h-4 ml-2">
                    {getIconComponentByName("ArrowRightBlack")}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
