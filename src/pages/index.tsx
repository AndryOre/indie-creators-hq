import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import MainLayout from "@/components/layout/mainLayout";
import { Button } from "@/components/ui/button";
import { DiscordLogo } from "@phosphor-icons/react";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Indie Creators HQ</title>
        <meta
          name="description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <link rel="icon" href="/favicon.svg" />

        <meta
          name="keywords"
          content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
        />
        <meta
          name="news_keywords"
          content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
        />

        <meta name="author" content="Serudda" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Indie Creators HQ" />
        <meta
          property="og:description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <meta
          property="og:url"
          content="https://indie-creators-hq.vercel.app"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
        />
        <meta property="og:site_name" content="Indie Creators HQ" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content="https://indie-creators-hq.vercel.app"
        />
        <meta name="twitter:creator" content="Serudda" />
        <meta name="twitter:title" content="Indie Creators HQ" />
        <meta
          name="twitter:description"
          content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
        />
      </Head>
      <MainLayout>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-gradient text-5xl font-bold md:text-6xl xl:text-8xl">
              <div>{t("hero.puv.powerYour")}</div>
              <div>{t("hero.puv.creativity")}</div>
            </div>
            <div className="text-muted-foreground lg:text-lg">
              <div>{t("hero.desc.unleash")}</div>
              <div>{t("hero.desc.bePart")}</div>
            </div>
          </div>
          <Link
            href="https://discord.gg/indie-creators-hq-by-serudda-972567584580984852"
            rel="noopener"
            target="_blank"
          >
            <div className="dark:hidden">
              <Button variant="secondary" aria-label={t("hero.cta")}>
                <DiscordLogo size={24} className="mr-2" />
                {t("hero.cta")}
              </Button>
            </div>
            <div className="hidden dark:block">
              <Button aria-label={t("hero.cta")}>
                <DiscordLogo size={24} className="mr-2" />
                {t("hero.cta")}
              </Button>
            </div>
          </Link>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
