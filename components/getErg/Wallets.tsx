import {
  Logo,
  WalletCheck,
  WalletDesktop,
  WalletLedger,
  WalletMark,
  WalletMobile,
  WalletStatusWithMark,
  WalletWeb,
  WalletX,
  WalletXGray,
  WalletYoroi,
} from "../icons";

export default function Wallets() {
  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between md:gap-36">
        <div className="my-auto">
          <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858] dark:text-[#585858]">
            CHOOSE YOURS
          </p>
          <p className="font-vinila-extended-bold text-[48px] lg:text-[120px]">
            Wallets
          </p>
        </div>
        <div className="my-auto">
          <p className="font-roboto font-bold text-[14px] lg:text-[16px] text-[#989898] dark:text-[#989898]">
            Digital wallets can help keep your digital currency safe, private
            and in your control.
          </p>
          <br />
          <p className="font-roboto text-[14px] lg:text-[16px] text-[#989898] dark:text-[#989898]">
            Keep in mind your wallet is unlike your bank account, so take extra
            precautions with your passwords and be sure to perform regular
            backups to protect your money. Note that wallets are supported by
            third parties, we only provide the information below as a courtesy,
            in order to simplify the overall digital currency experience for
            you.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex felx-row h-20 border-[1px] border-[#585858] rounded-t-3xl lg:rounded-b-full lg:rounded-t-full bg-[#292929] lg:border-0">
          <div className="my-auto w-1/5 lg:bg-brand-orange lg:rounded-l-full lg:h-full">
            <p className="text-[11px] lg:text-[24px] lg:mt-6 font-bold text-center text-brand-orange dark:text-brand-orange lg:text-white lg:dark:text-white">
              Wallets
            </p>
          </div>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">Type</p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            Native Asset Support
          </p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">Multisig</p>
          <p className="text-[11px] lg:text-[24px] w-1/5 my-auto text-center">
            Scripts Support
          </p>
        </div>
        <div className="flex flex-row border-x-[1px] border-[#585858] lg:border-0 lg:mt-8">
          <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
            <b>TEAM</b> WALLETS
          </div>
          <div className="grow">
            <div className="grow h-3 lg:h-4 my-auto border-b-[1px] border-[#585858] ml-2"></div>
          </div>
        </div>
        <div className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0">
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4">
            <Logo className="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12" viewBox="0 0 82 82" />
            <p className="text-center mt-2 lg:my-auto">Ergo Node</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletDesktop className="w-4 h-4 mx-auto lg:hidden" viewBox="0 0 18 18" />
            <p className="text-center mt-2 text-[12px]">Desktop</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck className="w-8 h-8 mx-auto lg:w-12 lg:h-12" viewBox="0 0 33 32" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck className="w-8 h-8 mx-auto lg:w-12 lg:h-12" viewBox="0 0 33 32" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck className="w-8 h-8 mx-auto lg:w-12 lg:h-12" viewBox="0 0 33 32" />
          </div>
        </div>
        <div className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0">
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4">
            <Logo className="w-6 h-6 mx-auto lg:mx-0 lg:w-12 lg:h-12" viewBox="0 0 82 82" />
            <p className="text-center lg:my-auto">Ergo Mobile</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletMobile className="w-4 h-4 mx-auto lg:hidden" viewBox="0 0 12 18" />
            <p className="text-center mt-2 text-[12px]">iOS/Android</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck className="w-8 h-8 mx-auto lg:w-12 lg:h-12" viewBox="0 0 33 32" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
        </div>

        <div className="flex flex-row border-x-[1px] border-[#585858] lg:border-0">
          <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
            <b>PARTNER</b> WALLETS
          </div>
          <div className="grow">
            <div className="grow h-3 lg:h-4 my-auto border-b-[1px] border-[#585858] ml-2"></div>
          </div>
        </div>

        <div className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0">
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4 lg:pl-2">
            <WalletLedger className="w-6 h-6 mx-auto lg:mx-0 lg:w-10 lg:h-10" viewBox="0 0 34 34" />
            <p className="text-center mt-2 lg:my-auto lg:pl-2">Ledger</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletWeb className="w-6 h-6 mx-auto lg:hidden" viewBox="0 0 20 20" />
            <p className="text-center mt-2 text-[12px]">Web</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletStatusWithMark
              className="w-8 h-8 mx-auto lg:w-14 lg:h-14 lg:pl-2"
              viewBox="0 0 55 48"
            />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletXGray className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletXGray className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
        </div>

        <div className="flex flex-row border-x-[1px] border-[#585858] lg:border-0">
          <div className="py-1 ml-2 text-[10px] lg:text-[16px] text-[#585858] lg:tracking-widest lg:uppercase">
            <b>OTHER</b> WALLETS
          </div>
          <div className="grow">
            <div className="grow h-3 lg:h-4 my-auto border-b-[1px] border-[#585858] ml-2"></div>
          </div>
        </div>
        <div className="flex flex-row h-28 border-x-[1px] border-[#585858] lg:border-0">
          <div className="w-1/5 p-1 my-auto flex flex-col lg:flex-row lg:justify-start lg:gap-4 lg:ml-4 lg:pl-2">
            <WalletYoroi className="w-6 h-6 mx-auto lg:mx-0 lg:w-10 lg:h-10" viewBox="0 0 43 38" />
            <p className="text-center mt-2 lg:my-auto lg:pl-2">Yoroi</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletWeb className="w-6 h-6 mx-auto lg:hidden" viewBox="0 0 20 20" />
            <p className="text-center mt-2 text-[12px]">Web</p>
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletCheck className="w-8 h-8 mx-auto lg:w-12 lg:h-12" viewBox="0 0 33 32" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
          <div className="w-1/5 p-1 my-auto">
            <WalletX className="w-7 h-7 mx-auto lg:w-11 lg:h-11" viewBox="0 0 44 42" />
          </div>
        </div>
        <div className="flex felx-row h-16 border-b-[1px] border-x-[1px] border-[#585858] rounded-b-3xl lg:border-0">
          <div className="my-auto mx-3">
            <WalletMark className="w-2 h-2 mb-1" viewBox="0 0 11 11" />
          </div>
          <div className="my-auto">
            <p className="text-[11px] font-bold my-auto text-brand-orange dark:text-brand-orange">
              RISK BURN NFT&quot;s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}