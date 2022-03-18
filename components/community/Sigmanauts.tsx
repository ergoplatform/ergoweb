import { FormattedMessage, useIntl } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";
import Button from "../Button";

export default function Sigmanauts() {
  const intl = useIntl();
  const buttonText = intl.formatMessage({
    id: "components.Sigmanauts.button",
    defaultMessage: "SIGMANAUTS ONBOARDING",
  });
  return (
    <div className="max-w-[1300px] mx-auto p-4 flex flex-col md:flex-row md:mt-44">
      <div className="flex justify-end mb-10 md:w-1/3 md:mt-auto md:mb-auto 2xl:justify-around">
        {getIconComponentByName("Sigmanauts")}
      </div>
      <div className="md:ml-20 md:w-2/3">
        <h1 className="mb-6 md:hidden">
          <FormattedMessage
            defaultMessage="Sigmanauts"
            id="components.Sigmanauts.title"
          />
        </h1>
        <h2 className="mb-6 hidden md:block">
          <b>
            <FormattedMessage
              defaultMessage="Sigmanauts"
              id="components.Sigmanauts.title"
            />
          </b>
        </h2>
        <p className="font-subtitle-1 mb-6 md:text-[56px]">
          <FormattedMessage
            defaultMessage="Ambassador programme"
            id="components.Sigmanauts.subTitle"
          />
        </p>
        <p className="text-[#989898] dark:text-[#989898] mb-6">
          <FormattedMessage
            defaultMessage="There is a rich budding ecosystem budding ontop of Ergo. Whether you are a developer, miner, or investor - we’ve got you covered."
            id="components.Sigmanauts.text"
          />
        </p>
        <div className="-ml-4">
          <Button
            text={buttonText}
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
  );
}
