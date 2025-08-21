import { useTheme } from 'next-themes';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

type Partner = {
  id: number;
  attributes: {
    name: string;
    url: string;
    image?: { data: { attributes: { url: string; width: number; height: number } } } | null;
    image_dark?: { data: { attributes: { url: string; width: number; height: number } } } | null;
  };
};

type Props = {
  partners: Partner[];
};

export default function Partners({ partners }: Props) {
  const { theme } = useTheme();

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <div id="Partners" className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10">
      <div className="text-center">
        <h2 className="text-[clamp(48px,12vw,100px)] md:text-[100px] lg:text-[120px] leading-tight heading-balance">
          <FormattedMessage id="components.partners.title" defaultMessage="Partners" />
        </h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
        {partners.map((partner: any) => (
          <div key={partner.id} className="col-span-1 flex justify-center py-8 px-8 m-auto">
            {partner.attributes.url ? (
              <a
                href={partner.attributes.url}
                target="_blank"
                rel="noreferrer"
                aria-label={partner.attributes.name}
              >
                {theme === 'dark' && partner.attributes.image_dark?.data != null ? (
                  <Image
                    width={partner.attributes.image_dark.data.attributes.width || 0}
                    height={partner.attributes.image_dark.data.attributes.height || 0}
                    src={partner.attributes.image_dark.data.attributes.url}
                    alt={partner.attributes.name}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={80}
                  />
                ) : partner.attributes.image?.data ? (
                  <Image
                    width={partner.attributes.image.data.attributes.width || 0}
                    height={partner.attributes.image.data.attributes.height || 0}
                    src={partner.attributes.image.data.attributes.url}
                    alt={partner.attributes.name}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={80}
                  />
                ) : null}
              </a>
            ) : (
              // Render a div or span if no URL is available, to maintain layout
              <div>
                {theme === 'dark' && partner.attributes.image_dark?.data != null ? (
                  <Image
                    width={partner.attributes.image_dark.data.attributes.width || 0}
                    height={partner.attributes.image_dark.data.attributes.height || 0}
                    src={partner.attributes.image_dark.data.attributes.url}
                    alt={partner.attributes.name}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={80}
                  />
                ) : partner.attributes.image?.data ? (
                  <Image
                    width={partner.attributes.image.data.attributes.width || 0}
                    height={partner.attributes.image.data.attributes.height || 0}
                    src={partner.attributes.image.data.attributes.url}
                    alt={partner.attributes.name}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    quality={80}
                  />
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
