import React, { useState } from 'react';
import Link from 'next/link';
import Logo from 'assets/icons/logo.svg';
import Socials from './Socials';
import Typography from 'components/rework/Typography';
import Burger from './Burger';
import { nav } from 'content/navigation';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import Language from './Language';
import ArrowDown from 'assets/icons/arrow-small-down.svg';

const navItemClass = '';

function Header() {
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const [burgerOpened, setBurgerOpened] = useState<boolean>(false);

  const changeActiveNav = (nav: number) => {
    if (nav === activeNav) return setActiveNav(null);

    setActiveNav(nav);
  };

  return (
    <>
      <div className="relative container-rework flex justify-between items-center py-6 md-max:py-4 z-20">
        <Link href="/" passHref className="block">
          <Logo fill={'#fff'} className="h-[30px] w-auto md-max:h-[24px]" />
        </Link>
        <div className="flex gap-x-6 md-max:hidden">
          {nav.list.map((item, idx) => {
            return (
              <button
                type="button"
                key={idx}
                onClick={() => changeActiveNav(idx)}
                className={`group flex gap-x-2 items-center px-5 py-3 transition-colors rounded-full ${
                  activeNav !== idx
                    ? 'hover:text-brand-orange'
                    : 'bg-background'
                }`}
              >
                <Typography as="span" type="alt">
                  {item.category}
                </Typography>
                <ArrowDown
                  className={`w-5 h-auto stroke-2 transition-colors ${
                    activeNav === idx
                      ? 'rotate-180'
                      : 'group-hover:stroke-brand-orange'
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="flex space-between items-center gap-x-3">
          <Socials />
          <Language />
          <Burger
            isOpened={burgerOpened}
            className="hidden md-max:block"
            onClick={() => setBurgerOpened((opened) => !opened)}
          />
        </div>
      </div>
      <Menu activeNav={activeNav} />
      <MobileMenu isOpened={burgerOpened} />
    </>
  );
}

export default Header;
