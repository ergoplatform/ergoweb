
type Props = {
  partners: any;
};

export default function Partners({
  partners,
}: Props) {

  return (
    <div className="">
      <div className="max-w-[1300px] mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h3 className="text-center">
          <b>Partners</b>
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
          {partners.data.map((partner: any, i: number) => (
            <div key={partner.id} className="col-span-1 flex justify-center py-8 px-8">
              <a href={partner.attributes.url} target="_blank" rel="noreferrer">
                <img
                  width={partner.attributes.image.data.attributes.width}
                  height={partner.attributes.image.data.attributes.height}
                  src={partner.attributes.image.data.attributes.url}
                  alt={partner.attributes.name}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}