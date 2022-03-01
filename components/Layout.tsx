import Head from 'next/head';
import Footer from './Footer';
import Navigation from './Navigation';

type Props = {
  children: React.ReactNode;
  desc?: string;
  title?: string;
};

export default function Layout({
  children,
  title,
}: Props) {

  return (
    <main className='dark:bg-brand-black'>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} | Ergo Platform`}</title>
      </Head>
      <Navigation />
      <div className=''>
        {children}
      </div>
      <Footer />
    </main>
  );
}