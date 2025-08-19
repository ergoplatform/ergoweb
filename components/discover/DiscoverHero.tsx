import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { getIconComponentByName } from '../../utils/icons-map';
import Button from '../Button';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import LazyInView from '../../utils/LazyInView';

const DiscoverErgHeroDark = dynamic(() => import('../icons/DiscoverErgHero'), {
  ssr: false,
});
const DiscoverErgHeroLightComp = dynamic(() => import('../icons/DiscoverErgHeroLight'), {
  ssr: false,
});

export default function DiscoverERG() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: 'components.discoverHero.button1',
    defaultMessage: 'READ THE DOCS',
  });
  const button2Text = intl.formatMessage({
    id: 'components.discoverHero.button2',
    defaultMessage: 'LEARN WITH DECO',
  });
  const button3Text = intl.formatMessage({
    id: 'components.discoverHero.button3',
    defaultMessage: 'READ THE MANIFESTO',
  });
  const button4Text = intl.formatMessage({
    id: 'components.discoverHero.button4',
    defaultMessage: 'CHECK THE BLOG',
  });
  const button5Text = intl.formatMessage({
    id: 'components.discoverHero.button5',
    defaultMessage: 'GET SETUP',
  });
  const button6Text = intl.formatMessage({
    id: 'components.discoverHero.button6',
    defaultMessage: 'VISIT ERGONAUT.SPACE',
  });

  return (
    <div id="DiscoverERG" className="max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="grid overflow-hidden grid-cols-1 xl:grid-cols-2 gap-2">
        <div className="box xl:order-2">
          <LazyInView>
            {() => {
              if (!mounted) return null;
              return resolvedTheme === 'dark' ? (
                <DiscoverErgHeroDark
                  viewBox="0 0 1011 811"
                  className="h-96 w-96 mx-auto md:w-[700px] md:h-[550px] xl:w-[600px] xl:h-[600px]"
                />
              ) : (
                <DiscoverErgHeroLightComp
                  viewBox="0 0 1011 811"
                  className="h-96 w-96 mx-auto md:w-[700px] md:h-[550px] xl:w-[600px] xl:h-[600px]"
                />
              );
            }}
          </LazyInView>
        </div>
        <div className="discover-container box xl:order-1">
          <h1 className="max-w-xs leading-tight">
            <FormattedMessage id="components.discoverHero.title" defaultMessage="Discover Ergo" />
          </h1>
          <p className="max-w-xs text-[#807e7e] dark:text-[#807e7e] mt-6">
            <FormattedMessage
              defaultMessage="Ergo is a next-generation Proof of Work smart-contract platform that enables new models of financial interaction, underpinned by a safe and rich scripting language built with flexible and powerful Zero-Knowledge proofs (Σ-protocols).
"
              id="components.discoverErgo.text.1"
            />
          </p>
          <div className="-ml-4 mt-10">
            <Button
              text={button3Text}
              url="https://ergoplatform.org/en/blog/2021-04-26-the-ergo-manifesto/"
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
              text={button1Text}
              url="https://docs.ergoplatform.com/"
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
              url="https://www.youtube.com/channel/UCyOIxD7YSHN5QwLIulOWrew/playlists"
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
              text={button4Text}
              url="/category/devs/"
              newTab={false}
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
            <FormattedMessage defaultMessage="Software" id="components.software.heading" />
          </h1>
          <p className="max-w-xs text-[#807e7e] dark:text-[#807e7e] mt-6">
            <FormattedMessage
              defaultMessage="The Ergo Node is your entry-point to development on Ergo and lets you communicate with the blockchain."
              id="components.software.description"
            />
          </p>
          <div className="-ml-4 mt-10">
            <Button
              text={button5Text}
              url="https://docs.ergoplatform.com/node/install/"
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
          <div className="sm:ml-28 mt-16 xl:mt-0">
            <h1 className="max-w-xs leading-tight">
              <FormattedMessage defaultMessage="Learn" id="components.learn.heading" />
            </h1>
            <p className="max-w-xs text-[#807e7e] dark:text-[#807e7e] mt-6">
              <FormattedMessage
                defaultMessage="Start from the basics. What is Ergo? What can you do on Ergo?"
                id="components.learn.description"
              />
            </p>
            <Link href="https://ergonaut.space" passHref>
              <a target="_blank" rel="noopener noreferrer">
                <button
                  type="submit"
                  className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange mt-6"
                >
                  <span>{button6Text}</span>
                  <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightBlack')}</span>
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
