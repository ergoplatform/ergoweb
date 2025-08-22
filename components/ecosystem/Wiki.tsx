import Image from 'next/image';
import Button from '../Button';
import { FormattedMessage } from 'react-intl';

export default function Wiki() {
  return (
    <div id="Wiki" className="max-w-[1300px] mx-auto p-4 relative z-10">
      {/* Desktop Wiki Section */}
      <div className="hidden md:block">
        <div className="flex flex-row mb-10">
          <p className="font-vinila-extended-bold text-[80px]">Wiki</p>
          <div className="my-auto ml-12">
            <Button
              text="EXPLORE"
              url="https://ergonaut.space/"
              newTab={true}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
              customClass=" -ml-4"
            />
          </div>
        </div>
        <div className="justify-around mt-16 md:-mt-10 dark:flex ecosystem-hero-gradient">
          <div className="ergonaut-card h-[349px] w-full flex flex-row justify-end">
            <div className="my-auto mx-auto">
              <p className="hidden md:block absolute z-20 max-w-lg -mt-[3rem] -ml-40 text-white dark:text-white text-[16px] lg:text-[20px]">
                <FormattedMessage
                  defaultMessage="<link>ergonaut.space</link> is our community-run wiki! Jam-packed with tons of great information on the underlying technical details of the Ergo blockchain in easy to understand language for non-technical people. Theres also plenty of guides, tutorials, and user-submitted content. Create an account to start contributing!"
                  id="components.wiki.description"
                  values={{
                    link: (chunks: any) => (
                      <a
                        href="https://ergonaut.space/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        {chunks}
                      </a>
                    ),
                  }}
                />
              </p>
            </div>
            <Image
              src={'/assets/ecosystem/ergonaut.png'}
              width={405}
              height={349}
              className="rounded-br-2xl"
              alt="The Ergo Mascot, The Ergonaut - is shown standing on a horizontal plane on top of a moon."
            />
          </div>
        </div>
      </div>

      {/* Mobile Wiki Section */}
      <div className="md:hidden">
        <p className="font-vinila-extended-bold text-[96px] mb-4 pl-8">
          <FormattedMessage defaultMessage="Wiki" id="components.wiki.heading" />
        </p>
        <div className="flex flex-col justify-center mb-4 pl-8">
          <Image
            src={'/assets/ecosystem/ergonaut.png'}
            width={405}
            height={349}
            className="rounded-br-2xl w-full h-auto"
            alt="The Ergo Mascot, The Ergonaut - is shown standing on a horizontal plane on top of a moon."
          />
        </div>
        <p className="text-[18px] text-[#807e7e] dark:text-[#807e7e] mb-4 pl-8">
          <FormattedMessage
            defaultMessage="<link>ergonaut.space</link> is the community wiki of the Ergo blockchain, a guide translating how to use and the underlying technical details of the Ergo blockchain in easy to understand language for non-technical people."
            id="components.wiki.description.short"
            values={{
              link: (chunks: any) => (
                <a
                  href="https://ergonaut.space/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-semibold text-lg"
                >
                  {chunks}
                </a>
              ),
            }}
          />
        </p>

        <Button
          text="LEARN MORE"
          url="https://ergonaut.space/"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass="pl-8"
        />
      </div>
    </div>
  );
}
