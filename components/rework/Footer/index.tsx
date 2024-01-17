import React from 'react';
import Link from 'next/link';
import Logo from 'assets/icons/logo.svg';
import Typography from 'components/rework/Typography';
import SingleFieldForm from 'components/rework/Form/SingleFieldForm';
import Nav from './Nav';
import Socials from './Socials';

function Footer() {
  return (
    <div className="relative pb-13.5 lg-max:pb-10">
      <div className="container-rework section pb-0">
        <div className="flex gap-[5.5rem] mb-14 lg-max:gap-x-7 md-max:block sm-max:mb-8">
          <div className="shrink-0 md-max:mb-12 sm-max:mb-8">
            <Link href="/" className="block mb-12 md-max:mb-8" passHref>
              <Logo className="h-12 w-auto md-max:h-10 sm-max:h-8" />
            </Link>
            <Typography as="p" className="mb-7 md-max:mb-5">
              World-changing ideas in your inbox
            </Typography>
            <SingleFieldForm className="w-[444px] lg-max:w-[363px] sm-max:w-full" />
          </div>
          <div className="w-full flex justify-between gap-[5.5rem] lg-max:gap-x-12 sm-max:flex-wrap sm-max:gap-0">
            <Nav />
          </div>
        </div>
        <div
          className="
            flex justify-between items-center border-b border-main-border
            sm-max:flex-col-reverse sm-max:items-start sm-max:gap-4
          "
        >
          <Socials />
          <Typography
            as="span"
            type="alt"
            className="w-full block pl-[12.2rem] lg-max:pl-12 md-max:pl-5 sm-max:pl-0 sm-max:pb-2.5"
          >
            <span className="text-main-border">©</span> 2024 Ergo Platform
          </Typography>
          <div className="flex gap-3.5 shrink-0 sm-max:flex-col sm-max:gap-4">
            <Link href={''} className="hover:text-brand-orange transition-colors">
              <Typography type="alt" as={'span'}>
                Privacy Policy
              </Typography>
            </Link>
            <Link
              href={''}
              className="sm-max:order-first hover:text-brand-orange transition-colors"
            >
              <Typography type="alt" as={'span'}>
                Legal
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
