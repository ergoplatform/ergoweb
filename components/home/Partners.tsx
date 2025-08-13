import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

type Partner = {
  id: number;
  attributes: {
    name: string;
    url: string;
    image?: { data: { attributes: { url: string; width: number; height: number } } } | null;
    image_dark?: { data: { attributes: { url: string; width: number; height: number } } } | null;
  };
};

export default function Partners() {
  const { theme } = useTheme();
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPartners = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_STRAPI_API;
        if (!base) {
          setPartners([]);
          return;
        }
        const url =
          base +
          '/api/partners?fields[0]=name&fields[1]=url' +
          '&populate[image][fields][0]=url&populate[image][fields][1]=width&populate[image][fields][2]=height' +
          '&populate[image_dark][fields][0]=url&populate[image_dark][fields][1]=width&populate[image_dark][fields][2]=height';
        const res = await fetch(url);
        const json = await res.json();
        if (!cancelled) setPartners(json?.data ?? []);
      } catch (e) {
        if (!cancelled) setPartners([]);
      }
    };
    fetchPartners();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <div id="Partners" className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10">
      <h3 className="max-w-xs leading-tight text-center">
        <FormattedMessage id="components.partners.title" defaultMessage="Partners" />
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
        {partners.map((partner: any) => (
          <div key={partner.id} className="col-span-1 flex justify-center py-8 px-8 m-auto">
            <a href={partner.attributes.url} target="_blank" rel="noreferrer">
              {theme == 'dark' && partner.attributes.image_dark?.data != null ? (
                <Image
                  width={partner.attributes.image_dark.data.attributes.width}
                  height={partner.attributes.image_dark.data.attributes.height}
                  src={partner.attributes.image_dark.data.attributes.url}
                  alt={partner.attributes.name}
                />
              ) : partner.attributes.image?.data ? (
                <Image
                  width={partner.attributes.image.data.attributes.width}
                  height={partner.attributes.image.data.attributes.height}
                  src={partner.attributes.image.data.attributes.url}
                  alt={partner.attributes.name}
                />
              ) : null}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
