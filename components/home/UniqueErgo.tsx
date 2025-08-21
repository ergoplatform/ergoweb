import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '../Button';
import UniqueErgo1 from '../icons/UniqueErgo1';
import UniqueErgo1Light from '../icons/UniqueErgo1Light';
import UniqueErgo2 from '../icons/UniqueErgo2';
import UniqueErgo2Light from '../icons/UniqueErgo2Light';
import UniqueErgo3 from '../icons/UniqueErgo3';
import UniqueErgo3Light from '../icons/UniqueErgo3Light';
import UniqueErgo4 from '../icons/UniqueErgo4';
import UniqueErgo4Light from '../icons/UniqueErgo4Light';

let cards = [
  {
    title: (
      <FormattedMessage
        defaultMessage="RESEARCH-LED AND REAL-WORLD FOCUSED"
        id={'components.uniqueErgo.card1.title'}
      />
    ),
    text: (
      <FormattedMessage
        defaultMessage="Ergo draws on ten years of blockchain development, complementing tried and tested principles with the best peer-reviewed academic research into cryptography, consensus models and digital currencies. We start with solid blockchain basics and implement new and powerful cryptography natively."
        id="components.uniqueErgo.card1.text"
      />
    ),
    url: '/discover/#DiscoverERG',
    buttoText: (
      <FormattedMessage defaultMessage="EXPLORE" id="components.uniqueErgo.card1.button" />
    ),
    icon: <UniqueErgo1 />,
    iconLight: <UniqueErgo1Light />,
  },
  {
    title: (
      <FormattedMessage defaultMessage="POWERFUL AND SAFE" id="components.uniqueErgo.card2.title" />
    ),
    text: (
      <FormattedMessage
        defaultMessage="Ergo provides superior support for real-world financial agreements. Ergo can support versatile dApps that run predictably, with known costs, and don’t have any of the dangers of unrestricted functionality. Ergo’s smart contracts allow us to execute wide-ranging tasks and can be Turing complete, but we always know in advance how much the code will cost and whether it will run successfully."
        id="components.uniqueErgo.card2.text"
      />
    ),
    url: '/discover/#FAQ',
    buttoText: (
      <FormattedMessage defaultMessage="EXPLORE" id="components.uniqueErgo.card2.button" />
    ),
    icon: <UniqueErgo2 />,
    iconLight: <UniqueErgo2Light />,
  },
  {
    title: (
      <FormattedMessage
        defaultMessage="INTELLIGENT AND STRAIGHTFORWARD"
        id="components.uniqueErgo.card3.title"
      />
    ),
    text: (
      <FormattedMessage
        defaultMessage="Sigma Protocols (Σ-Protocols) are the foundation of Ergo’s smart contracts. They allow for a class of efficient zero-knowledge protocols that enable us to implement sophisticated tasks that would otherwise be impossible, risky, or expensive. Welcome to self-sovereign application-level privacy: trustless scripts that can be used to access mixers or other functionality without any third parties required."
        id="components.uniqueErgo.card3.text"
      />
    ),
    url: '/blog/2022-02-01-decentralized-finance-and-optional-privacy-on-ergo/',
    buttoText: (
      <FormattedMessage defaultMessage="EXPLORE" id="components.uniqueErgo.card3.button" />
    ),
    icon: <UniqueErgo3 />,
    iconLight: <UniqueErgo3Light />,
  },
  {
    title: (
      <FormattedMessage
        defaultMessage="SECURE AND ACCESSIBLE"
        id="components.uniqueErgo.card4.title"
      />
    ),
    text: (
      <FormattedMessage
        defaultMessage="Ordinary users who do not run a full node should enjoy the same security benefits as miners. Non-Interactive Proofs of Proof-of-Work (NIPOPOWS) allow us to make and verify transactions with complete confidence without needing the storage, bandwidth and time required to download the full blockchain. As little as 1 MB of data is necessary, meaning you can use any device."
        id="components.uniqueErgo.card4.text"
      />
    ),
    url: 'https://docs.ergoplatform.com/tags/#nipopows',
    buttoText: (
      <FormattedMessage defaultMessage="EXPLORE" id="components.uniqueErgo.card4.button" />
    ),
    icon: <UniqueErgo4 />,
    iconLight: <UniqueErgo4Light />,
  },
];

export default function UniqueErgo() {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    let activeCard = cards[0];

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        activeCard.classList.remove('active');
        activeCard = card;
        activeCard.classList.add('active');
      });
    });
  }, []);

  return (
    <div id="UniqueErgo" className="mt-28 lg:min-h-[600px]">
      <div className="text-center">
        <p className="font-bold text-[#585858] dark:text-[#807e7e] text-[16px] lg:text-[20px]">
          <FormattedMessage
            defaultMessage="WHAT MAKES ERGO UNIQUE"
            id="components.uniqueErgo.title"
          />
        </p>
      </div>
      <div className="relative z-20 overflow-x-auto no-scrollbar">
        <div className="antialiased flex items-center justify-center my-8 min-w-[1000px]">
          <div className="flex items-stretch min-w-md w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                className={
                  'bg-center bg-cover bg-[#FCFCFC] dark:bg-brand-black card cursor-pointer flex-grow min-w-[260px] sm:min-w-[300px] relative transition-base border-[1px] border-[#625d5d] dark:border-[#2A2A2A] pb-24 overflow-hidden' +
                  (index === 0 ? ' active' : '')
                }
              >
                <div className="flex flex-col p-4 pt-16 lg:pt-8">
                  <div className="flex label mb-3 ml-0 lg:ml-12 transition-base z-20 text-[clamp(12px,1.8vw,20px)] lg:text-[clamp(16px,1.5vw,24px)] leading-tight flex-col overflow-hidden">
                    <div className="h-48 flex items-center justify-center overflow-hidden">
                      <div className="hidden dark:block w-full h-auto max-w-full object-contain">
                        {card.icon}
                      </div>
                      <div className="dark:hidden w-full h-auto max-w-full object-contain">
                        {card.iconLight}
                      </div>
                    </div>
                    <div className="mt-8 max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] break-words">
                      {card.title}
                    </div>
                  </div>
                  <div className="mt-4 text-black dark:text-white max-w-xs lg:max-w-sm ml-0 lg:ml-12">
                    <div>{card.text}</div>
                  </div>
                  {card.url !== undefined ? (
                    <div className="mt-4 text-black dark:text-white max-w-xs lg:max-w-sm ml-0 lg:ml-12">
                      <div className="-ml-4 mt-12 sm:mt-10 lg:mt-16">
                        <Button
                          text={card.buttoText}
                          url={card.url}
                          newTab={true}
                          underline={true}
                          textColor="black"
                          background={false}
                          icon="ArrowRight"
                          iconColor="orange"
                          customClass="dark:text-brand-orange"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
