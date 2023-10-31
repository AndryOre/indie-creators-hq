import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/themeProvider";

import { appWithTranslation } from "next-i18next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    const userLang = localStorage.getItem("lang");
    if (userLang && router.locale !== userLang) {
      void router.push(router.pathname, router.pathname, { locale: userLang });
    }
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className={`${spaceGrotesk.variable} relative font-sans`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

const i18nApp = appWithTranslation(MyApp);
const TRPCApp = api.withTRPC(i18nApp);

export default TRPCApp;
