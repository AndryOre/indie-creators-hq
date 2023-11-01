import type { ReactNode } from "react";

import Head from "next/head";

import { Footer, Header } from "@/components";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Indie Creators HQ</title>
      </Head>
      <div className="dot-pattern flex h-screen flex-col">
        <Header />
        <main className="flex grow flex-col items-center justify-center px-4 py-14 lg:px-16 xl:px-40	">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
