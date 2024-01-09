import Link from 'next/link';
import Button from '../Button';
import {
  Logo,
  RoadmapInProgress,
  WalletCheck,
  WalletDesktop,
  WalletMinotaur,
  WalletMobile,
  WalletNautilus,
  WalletSafew,
  WalletSatergo,
  WalletWeb,
  WalletX,
  WalletXGray,
} from '../icons';
import { FormattedMessage } from 'react-intl';

export default function Wallets() {
  return (
    <div
      id="Wallets"
      className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10"
    >
      <div className="flex flex-col md:flex-row justify-between md:gap-36">
        <div className="my-auto">
          <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858] dark:text-[#585858]">
            <FormattedMessage
              defaultMessage="CHOOSE YOURS"
              id="components.wallets.chooseYours"
            />
          </p>
          <p className="font-vinila-extended-bold text-[48px] lg:text-[120px]">
            <FormattedMessage
              defaultMessage="Wallets"
              id="components.wallets.walletsTitle"
            />
          </p>
        </div>
        <div className="my-auto">
          <p className="font-roboto font-bold text-[14px] lg:text-[16px] text-[#807e7e] dark:text-[#807e7e]">
            <FormattedMessage
              defaultMessage="Digital wallets can help keep your digital currency safe, private and in your control."
              id="components.wallets.walletDescription1"
            />
          </p>
          <br />
          <p className="font-roboto text-[14px] lg:text-[16px] text-[#807e7e] dark:text-[#807e7e]">
            <FormattedMessage
              defaultMessage="Note that wallets are supported by third parties, we only provide the information below as a courtesy, in order to simplify the overall digital currency experience for you."
              id="components.wallets.walletDescription2"
            />
          </p>
          <br />
          <p className="font-roboto text-[14px] lg:text-[16px] text-[#807e7e] dark:text-[#807e7e]">
            <Button
              text={
                <FormattedMessage
                  defaultMessage="SETUP GUIDES"
                  id="components.wallets.setupGuides"
                />
              }
              url="/category/Tooling/"
              newTab={false}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
              customClass=" -ml-4 mb-8"
            />
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex felx-row h-20 border-[1px] border-[#585858] rounded-t-3xl lg:rounded-b-full lg:rounded-t-full bg-[#E0E0E0] dark:bg-[#292929] lg:border-0 gap-x-4">
          <div className="my-auto w-1/5 lg:bg-brand-orange lg:rounded-l-full lg:h-full">
            <p className="text-[11px] lg:text-[24px] lg:mt-6 font-bold text-center text-brand-orange dark:text-brand-orange lg:text-white lg:dark:text-white">
              <FormattedMessage
                defaultMessage="Wallets"
                id="components.wallets.walletsHeader"
              />
            </p>
          </div>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            <FormattedMessage
              defaultMessage="Feature"
              id="components.wallets.featureHeader"
            />
          </p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            <FormattedMessage
              defaultMessage="Cold Storage"
              id="components.wallets.coldStorageHeader"
            />
          </p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            <FormattedMessage
              defaultMessage="dApp Connector"
              id="components.wallets.dAppConnectorHeader"
            />
          </p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            <FormattedMessage
              defaultMessage="ErgoPay"
              id="components.wallets.ErgoPay"
            />
          </p>
        </div>
        <p className="font-roboto text-[14px] lg:text-[16px] text-[#807e7e] dark:text-[#807e7e]">
          <br />
          <Button
            text="WHAT WALLET IS RIGHT FOR ME?"
            url="#"
            newTab={false}
            underline={true}
            textColor="brand-orange"
            background={false}
            icon="ArrowRight"
            iconColor="orange"
            customClass=" -ml-4 mb-8"
          />
        </p>
        <div className="flex flex-row border-x-[1px] border-[#585858] lg:border-0 lg:mt-8">
          <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
            <b>COMMUNITY</b> FAVOURITES
          </div>
          <div className="grow">
            <div className="grow h-3 lg:h-4 my-auto border-b-[1px] border-[#585858] ml-2"></div>
          </div>
        </div>
        <Link href="/ergo-wallet-app" legacyBehavior>
          <a
            rel="noreferrer"
            className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
          >
            <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4">
              <Logo
                className="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12"
                viewBox="0 0 82 82"
              />
              <p className="text-center lg:my-auto">Ergo Wallet App</p>
            </div>
            <div className="w-1/5 p-1 my-auto">
              <WalletMobile
                className="w-4 h-4 mx-auto lg:hidden"
                viewBox="0 0 12 18"
              />
              <p className="text-center mt-2 text-[12px]">Best for mobile</p>
            </div>
            <div className="w-1/5 p-1 my-auto">
              <WalletCheck
                className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
                viewBox="0 0 33 32"
              />
            </div>
            <div className="w-1/5 p-1 my-auto">
              <WalletXGray
                className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
                viewBox="0 0 44 42"
              />
            </div>
            <div className="w-1/5 p-1 my-auto">
              <WalletCheck
                className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
                viewBox="0 0 33 32"
              />
            </div>
          </a>
        </Link>
        <a
          href="https://github.com/capt-nemo429/nautilus-wallet"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
        >
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4 lg:pl-2">
            <WalletNautilus
              className="w-6 h-6 mx-auto lg:mx-0 lg:w-10 lg:h-10"
              viewBox="414.37 258.52 575.6 575.6"
            />
            <p className="text-center mt-2 lg:my-auto lg:pl-2">Nautilus</p>
          </div>

          <div className="w-1/5 p-1 my-auto">
            <WalletWeb
              className="w-6 h-6 mx-auto lg:hidden"
              viewBox="0 0 20 20"
            />
            <p className="text-center mt-2 text-[12px]">Best for dApps</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
        </a>
        <a
          href="https://satergo.com/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
        >
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4 lg:pl-2">
            <WalletSatergo
              className="w-6 h-6 mx-auto lg:mx-0 lg:w-10 lg:h-10"
              viewBox="0 0 1080 1080"
            />
            <p className="text-center mt-2 lg:my-auto lg:pl-2">Satergo</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletDesktop
              className="w-6 h-6 mx-auto lg:hidden"
              viewBox="0 0 18 18"
            />
            <p className="text-center mt-2 text-[12px]">Desktop</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <RoadmapInProgress
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletXGray
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
        </a>
        <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
          <b>EXTRA</b> FEATURES
        </div>
        <a
          href="https://github.com/ThierryM1212/SAFEW"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
        >
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4 lg:pl-2">
            <WalletSafew
              className="w-6 h-6 mx-auto lg:mx-0 lg:w-10 lg:h-10"
              viewBox="0 0 28 28"
            />

            <p className="text-center mt-2 lg:my-auto lg:pl-2">SAFEW</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletWeb
              className="w-6 h-6 mx-auto lg:hidden"
              viewBox="0 0 20 20"
            />
            <p className="text-center mt-2 text-[12px]">Developer Tooling</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <RoadmapInProgress
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
        </a>
        <a
          href="https://github.com/minotaur-ergo/minotaur-wallet"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
        >
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4">
            <WalletMinotaur
              className="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12"
              viewBox="0 0 1337 1337"
            />
            <p className="text-center lg:my-auto">Minotaur</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletMobile
              className="w-4 h-4 mx-auto lg:hidden"
              viewBox="0 0 12 18"
            />
            <p className="text-center mt-2 text-[12px]">Multi Platform</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <RoadmapInProgress
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletXGray
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck
              className="w-8 h-8 mx-auto lg:w-12 lg:h-12"
              viewBox="0 0 33 32"
            />
          </div>
        </a>
        <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
          <b>REFERENCE</b> CLIENT
        </div>

        <a
          href="https://docs.ergoplatform.com/node/install/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0"
        >
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4">
            <Logo
              className="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12"
              viewBox="0 0 82 82"
            />
            <p className="text-center mt-2 lg:my-auto">Ergo Node</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletDesktop
              className="w-4 h-4 mx-auto lg:hidden"
              viewBox="0 0 18 18"
            />
            <p className="text-center mt-2 text-[12px]">Server</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletXGray
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX
              className="w-7 h-7 mx-auto lg:w-11 lg:h-11"
              viewBox="0 0 44 42"
            />
          </div>
        </a>

        <div className="flex felx-row h-16 border-b-[1px] border-x-[1px] border-[#585858] rounded-b-3xl lg:border-0"></div>
      </div>
    </div>
  );
}
