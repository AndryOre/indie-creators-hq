import type { ReactNode } from "react";

import Head from "next/head";

import { Footer, Header, Toaster } from "@/components";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Indie Creators HQ</title>
      </Head>
      <div
        className="grid min-h-screen"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <Header />
        <main className="flex flex-col items-center overflow-x-hidden px-4 lg:px-16 xl:px-40">
          {children}
        </main>
        <Toaster />
        <Footer />
      </div>
    </>
  );
}
