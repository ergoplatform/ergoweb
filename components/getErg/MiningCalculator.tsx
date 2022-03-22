type Props = {
  currentPrice: number;
  currentBlockReward: number;
  networkHashrate: number;
};

export default function MiningCalculator(props: Props) {
  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4">
      <div className="mining-calculator-bg mx-auto max-w-[1167px] grid gap-14 grid-cols-1 lg:grid-cols-2 py-12 lg:py-24 px-10 lg:px-20">
        <div>
          <h2 className="font-vinila-extended font-bold leading-none mb-6 text-[40px] lg:text-[80px]">
            Mining Calculator
          </h2>
          <p className="text-[16px] text-[#989898] dark:text-[#989898] mb-7 lg:hidden">
            Autolykos is the underlying Memory-hard ASIC-resistant Proof of Work
            (PoW) algorithm oriented towards GPUs.
          </p>
          <div className="lg:mb-4">
            <p className="text-[16px] lg:text-[20px] mb-4 lg:my-auto lg:pr-2">Your hashrate</p>
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="hashrate"
                  id="hashrate"
                  className="block w-full h-12 pl-4 pr-10 sm:text-sm rounded-2xl bg-transparent border-[1px] border-white"
                  placeholder="Hashrate value"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  MH/s
                </div>
              </div>
            </div>
          </div>
          <p className="text-[16px] text-[#989898] dark:text-[#989898] mb-7 hidden lg:block">
            Autolykos is the underlying Memory-hard ASIC-resistant Proof of Work
            (PoW) algorithm oriented towards GPUs.
          </p>
        </div>
        <div>
          <p className="mb-6 lg:mb text-[16px] lg:mt-[92px] lg:text-[20px]">Daily revenue</p>
          <p className="text-[32px] lg:text-[40px]">0.00 ERG</p>
          <p className="mb-16 text-[32px] lg:text-[40px]">
            ={" "}
            <span className="text-brand-orange dark:text-brand-orange">
              $0.00
            </span>
          </p>
          <div className="flex flex-row justify-between">
            <div>
              <p>Current Price</p>
              <p>1 ERG =</p>
              <p className="text-brand-orange dark:text-brand-orange">
                ${props.currentPrice}
              </p>
            </div>
            <div>
              <p>Current Price</p>
              <p>${props.currentBlockReward} ERG =</p>
              <p className="text-brand-orange dark:text-brand-orange">
                ${props.currentBlockReward * props.currentPrice}
              </p>
            </div>
            <div>
              <p>Current Price</p>
              <p>${props.networkHashrate}</p>
              <p>TH/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
