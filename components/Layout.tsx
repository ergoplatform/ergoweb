import Head from 'next/head';
import Footer from './Footer';
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicNavigation = dynamic(() => import('./Navigation'), { ssr: false });

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
      <DynamicNavigation />
      <div className="flex-grow">{children}</div>
      {footer && <Footer />}
    </main>
  );
}
