import { FormattedMessage, useIntl } from "react-intl"
import Button from "../Button";

export default function Autolykos() {
  const intl = useIntl();
  const button = intl.formatMessage({ id: 'components.autolykos.button', defaultMessage: 'MINE ERG' });

  return (
    <>
      <div className="mt-80 px-8 py-12 mx-4 rounded-xl card-bg md:hidden">
        <b className="font-roboto text-[14px]"><FormattedMessage defaultMessage="MINING CALCULATOR" id="components.autolykos.header" /></b>
        <p className="font-vinila-extended-bold text-[32px] leading-none mt-4"><FormattedMessage defaultMessage="The Future of Proof of Work" id="components.autolykos.title" /></p>
        <p className="mt-8"><FormattedMessage defaultMessage="<b>Autolykos</b> is the underlying Memory-hard ASIC-resistant Proof of Work (PoW) algorithm oriented towards GPUs." id="components.autolykos.title" values={{ b: (...chunks: any) => <b>{chunks}</b> }} /></p>
        <div className="my-8"><Button text={button} textColor="black" url="/get-erg" newTab={false} underline={false} background={true} iconColor="black" icon="ArrowRight" /></div>
      </div>

      <div className="hidden md:block px-8 py-12 mx-28 rounded-xl autolykos-bg mt-52">
        <b className="font-roboto text-[20px]"><FormattedMessage defaultMessage="MINING CALCULATOR" id="components.autolykos.header" /></b>
        <div className="flex flex-row">
          <div className="w-2/3">
            <p className="font-vinila-extended-bold text-[80px] leading-none mt-4"><FormattedMessage defaultMessage="The Future of Proof of Work" id="components.autolykos.title" /></p>
            <div className="my-8 float-right pr-28"><Button text={button} textColor="black" url="/get-erg" newTab={false} underline={false} background={true} iconColor="black" icon="ArrowRight" /></div>
          </div>
          <div className="w-1/3">
            <p className="mt-8 text-2xl"><FormattedMessage defaultMessage="<b>Autolykos</b> is the underlying Memory-hard ASIC-resistant Proof of Work (PoW) algorithm oriented towards GPUs." id="components.autolykos.title" values={{ b: (...chunks: any) => <b>{chunks}</b> }} /></p>
          </div>
        </div>
      </div>
    </>
  );
}
