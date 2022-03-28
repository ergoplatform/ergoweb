import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Button";

export default function HomeHero() {
  const intl = useIntl();
  const button = intl.formatMessage({
    id: "components.homeHero.button",
    defaultMessage: "DIVE IN",
  });

  return (
    <div className="mt-36 max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="max-w-lg leading-none md:max-w-4xl">
        <h1 className="md:hidden">
          <b>
            <FormattedMessage
              defaultMessage="Powering the Future of Finance"
              id="components.homeHero.title"
            />
          </b>
        </h1>
        <h3 className="hidden md:block">
          <b>
            <FormattedMessage
              defaultMessage="Powering the Future of Finance"
              id="components.homeHero.title"
            />
          </b>
        </h3>
      </div>
      <div className="mt-6 md:mt-10 max-w-lg md:max-w-xl">
        <p className="font-subtitle-3-regular">
          <FormattedMessage
            defaultMessage="Ergo delivers a sophisticated smart contract platform enabling ordinary people to create trustless financial agreements between themselves."
            id="components.homeHero.text"
          />
        </p>
      </div>
      <div className="mt-8 md:mt-6">
        <Button
          text={button}
          textColor="black"
          url="/discover"
          newTab={false}
          underline={false}
          background={true}
          iconColor="black"
          icon="ArrowRight"
        />
      </div>
    </div>
  );
}
