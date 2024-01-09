import React, { useEffect } from 'react';
import Link from 'next/link';
import { nav } from 'content/navigation';
import Typography from 'components/rework/Typography';
import SingleFieldForm from '../Form/SingleFieldForm';
import Socials from 'components/rework/Footer/Socials';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface Props {
  activeNav: number | null;
}

function Menu(props: Props) {
  const { activeNav } = props;

  useEffect(() => {
    if (activeNav !== null) {
      disableBodyScroll(window as any);
      window.scrollTo({
        top: 0,
      });
    } else {
      enableBodyScroll(window as any);
    }
  }, [activeNav]);

  if (activeNav === null) return null;

  return (
    <div className="fixed inset-0 bg-brand-black size-full z-10 pt-[92px] overflow-y-scroll">
      <div className="container-rework flex h-full pt-6 pb-16">
        <div className="grid grid-cols-2 auto-rows-max gap-x-8 pr-8">
          {nav.list[activeNav].items.map((item, idx) => {
            return (
              <div className="p-6" key={idx}>
                <Link href={item.link} className="group">
                  <Typography
                    type="title-3"
                    as={'span'}
                    className="block mb-2 group-hover:text-brand-orange transition-colors"
                  >
                    {item.name}
                  </Typography>
                  <Typography type="alt" className="text-secondary">
                    {item.description}
                  </Typography>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="w-[392px] shrink-0 pl-8 border-l border-main-border flex flex-col space-between items-center">
          <div>
            <Typography type="title-1" as="p" className="mb-7">
              World-changing ideas in your inbox
            </Typography>
            <SingleFieldForm />
          </div>
          <div className="mt-auto border-b border-main-border">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
