import { useEffect } from "react";

import { type AppType } from "next/app";
import { Space_Grotesk } from "next/font/google";
import { useRouter } from "next/router";

import { ThemeProvider } from "@/components";
import "@/styles/globals.css";
import { api } from "@/utils/api";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
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
      <style jsx global>
        {`
          :root {
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

const i18nApp = appWithTranslation(MyApp);
const TRPCApp = api.withTRPC(i18nApp);

export default TRPCApp;
