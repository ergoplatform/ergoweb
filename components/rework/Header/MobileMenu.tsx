import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { nav } from 'content/navigation';
import Typography from 'components/rework/Typography';
import ArrowSmallDown from 'assets/icons/arrow-small-down.svg';
import { Collapse } from 'react-collapse';
import SingleFieldForm from 'components/rework/Form/SingleFieldForm';
import Socials from 'components/rework/Footer/Socials';

interface Props {
  isOpened: boolean;
}

function MobileMenu(props: Props) {
  const { isOpened = false } = props;
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpened) {
      // @ts-ignore
      disableBodyScroll(window.body, {
        reserveScrollBarGap: true,
      });
      window.scrollTo({
        top: 0,
      });
    } else {
      // @ts-ignore
      enableBodyScroll(window.body);
    }
  }, [isOpened]);

  const changeActiveNav = (nav: number) => {
    if (nav === activeId) return setActiveId(null);

    setActiveId(nav);
  };

  if (!isOpened) return null;

  return (
    <div className="inset-0 z-10 hidden md-max:block md-max:fixed bg-brand-black pt-14 pb-4">
      <div className="container-rework relative max-h-full scroll-y">
        {nav.list.map((item, idx) => {
          return (
            <div
              className="py-5 border-b border-main-border first:border-t cursor-pointer"
              key={idx}
            >
              <div
                className="flex justify-between items-center w-full"
                onClick={() => changeActiveNav(idx)}
              >
                <Typography as={'span'} type="title-3">
                  {item.category}
                </Typography>
                <ArrowSmallDown />
              </div>
              <Collapse isOpened={idx === activeId}>
                <div className="pt-5">
                  {item.items.map((navItem, navIdx) => {
                    return (
                      <Link
                        href={navItem.link}
                        className="block py-1 mb-4"
                        key={`${idx}-${navIdx}`}
                      >
                        <Typography type="title-3" className="mb-2">
                          {navItem.name}
                        </Typography>
                        <Typography type="alt" className="text-secondary">
                          {navItem.description}
                        </Typography>
                      </Link>
                    );
                  })}
                </div>
              </Collapse>
            </div>
          );
        })}
        <div className="pt-12">
          <Typography type="title-3" className="mb-2">
            World-changing ideas in your inbox
          </Typography>
          <SingleFieldForm className="mb-12" />
          <div className="text-center">
            <div className="inline-block border-b border-main-border">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
