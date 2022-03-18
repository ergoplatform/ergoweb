
type Props = {
  exchanges: any;
};

export default function Exchanges({
  exchanges,
}: Props) {

  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
          <p className="text-[#585858] dark:text-[#585858] mb-4">BUY, SELL AND TRADE ERGO</p>
          <h2><b>Exchanges</b></h2>
        </div>
        <div>
          <p className="font-subtitle-3-bold text-[#989898] dark:text-[#989898] mb-6 max-w-lg">You can buy, sell and trade Ergo on a number of online platforms called exchanges.</p>
          <p className="text-[#989898] dark:text-[#989898] max-w-lg">Disclaimer: Exchanges provide highly varying degrees of safety, security, privacy, and control over your funds and information. Perform your own research and consider whether storage of your coins in a wallet would be a safer option.</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-4 lg:mt-8">
        {exchanges.data.map((exchange: any) => (
          <div key={exchange.id} className="col-span-1 flex justify-center py-8 px-8">
            <a href={exchange.attributes.url} target="_blank" rel="noreferrer">
              <img
                width={exchange.attributes.image.data?.attributes.width}
                height={exchange.attributes.image.data?.attributes.height}
                src={exchange.attributes.image.data?.attributes.url}
                alt={exchange.attributes.name}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}