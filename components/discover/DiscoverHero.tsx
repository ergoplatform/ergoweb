import { FormattedMessage, useIntl } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";
import Button from "../Button";
import { DiscoverErgHero } from "../icons";

export default function DiscoverHero() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: "components.discoverHero.button1",
    defaultMessage: "GRANTS & BOUNTIES",
  });
  const button2Text = intl.formatMessage({
    id: "components.discoverHero.button2",
    defaultMessage: "FAQ",
  });
  const button3Text = intl.formatMessage({
    id: "components.discoverHero.button3",
    defaultMessage: "DOCUMENTS",
  });
  const button4Text = intl.formatMessage({
    id: "components.discoverHero.button4",
    defaultMessage: "SEE LATEST RELEASES",
  });
  const button5Text = intl.formatMessage({
    id: "components.discoverHero.button5",
    defaultMessage: "ERGONAUT.SPACE",
  });

  return (
    <div className="max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="grid overflow-hidden grid-cols-1 xl:grid-cols-2 gap-2">
        <div className="box xl:order-2">
          <DiscoverErgHero
            viewBox="0 0 1011 811"
            className="h-96 w-96 mx-auto xl:w-[600px] xl:h-[600px]"
          />
        </div>
        <div className="box xl:order-1">
          <h1 className="max-w-xs leading-tight">
            <b>Discover Ergo</b>
          </h1>
          <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6">
            <FormattedMessage
              defaultMessage="Ergo's pioneering technology enables infinite smartcontract possiblities."
              id="components.discoverErgo.text.1"
            />
          </p>
          <div className="-ml-4 mt-10">
            <Button
              text={button1Text}
              url="/url"
              newTab={true}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
            />
          </div>
          <div className="-ml-4 mt-10">
            <Button
              text={button2Text}
              url="/url"
              newTab={true}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
            />
          </div>
          <div className="-ml-4 mt-10">
            <Button
              text={button3Text}
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
        <div className="box xl:order-3">
          <h1 className="max-w-xs leading-tight mt-36 xl:mt-0">
            <b>Software</b>
          </h1>
          <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6">
            Explore the newests Ergo Protocol Reference, Ergo Platform Reference
            and update notes.
          </p>
          <div className="-ml-4 mt-10">
            <Button
              text={button4Text}
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
        <div className="box xl:order-4">
          <div className="ml-28 mt-16 xl:mt-0">
            <h1 className="max-w-xs leading-tight">
              <b>Learn</b>
            </h1>
            <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6">
              Visit Ergodocs for technical documentaiton, or ergonaut.space for
              an easier to understand overview
            </p>
            <button
              type="submit"
              className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange mt-6"
            >
              <span>{button5Text}</span>
              <span className="w-4 h-4 ml-2">
                {getIconComponentByName("ArrowRightBlack")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
