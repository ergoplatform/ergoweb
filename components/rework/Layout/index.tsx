import React from 'react';
import Header from 'components/rework/Header';
import Footer from 'components/rework/Footer';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="font-vinila-test bg-brand-black text-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
