import Head from 'next/head';
import Footer from './Footer';
import React from 'react';
import Navigation from './Navigation';

type Props = {
  children: React.ReactNode;
  desc?: string;
  title?: string;
  footer?: boolean;
};

export default function Layout({ children, title, desc, footer = true }: Props) {
  return (
    <main className="dark:bg-brand-black overflow-hidden min-h-screen">
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
      <header className="w-full fixed top-0 left-0 right-0 z-[9999] h-[6em] md:h-[9em] bg-white/80 dark:bg-brand-black/60 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/50">
        <Navigation />
      </header>
      <div className="h-[6em] md:h-[9em]" aria-hidden="true" />
      <div className="flex-grow">{children}</div>
      {footer && <Footer />}
    </main>
  );
}
