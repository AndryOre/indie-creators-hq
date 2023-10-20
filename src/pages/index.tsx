import type { NextPage, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import MainLayout from "@/components/layout/mainLayout";

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
      <MainLayout>{t("title")}</MainLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
