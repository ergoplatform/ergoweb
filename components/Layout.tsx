import Head from 'next/head';
import Footer from './Footer';
import Navigation from './Navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  desc?: string;
  title?: string;
  footer?: boolean;
};

export default function Layout({ children, title, desc, footer = true }: Props) {
  return (
    <main className="dark:bg-brand-black overflow-hidden">
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} | Ergo Platform`}</title>
        <meta
          name="description"
          content={
            typeof desc !== 'undefined' && desc !== null
              ? String(desc)
              : 'Ergo is a next-generation smart contract platform focused on secure, accessible, and decentralized financial tools.'
          }
        />
      </Head>
      <Navigation />
      <div className="">{children}</div>
      {footer && <Footer />}
    </main>
  );
}
