import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import {
  BenefitShowcase,
  Button,
  DottedPattern,
  Faqs,
  MainLayout,
  PopularProjects,
} from "@/components";

import { DiscordLogo } from "@phosphor-icons/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-72px)] xl:h-[calc(100vh-88px)] justify-center items-center">
        <DottedPattern className="-z-1 absolute" />
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-gradient text-5xl font-bold md:text-6xl xl:text-8xl flex flex-col">
              <div>{t("hero.puv.powerYour")}</div>
              <div className="mb-1">{t("hero.puv.creativity")}</div>
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
            <Button aria-label={t("hero.cta")}>
              <DiscordLogo size={24} className="mr-2" />
              {t("hero.cta")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="items-center flex flex-col justify-center gap-16 py-16">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-3xl font-bold text-primary dark:text-primary md:text-4xl xl:text-5xl">
            {t("communityBenefits.title")}
          </div>
          <div className="text-muted-foreground">
            {t("communityBenefits.desc")}
          </div>
        </div>
        <BenefitShowcase />
      </div>
      <div className="items-center flex flex-col justify-center gap-16 py-16 w-full">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-3xl font-bold text-primary dark:text-primary md:text-4xl xl:text-5xl">
            {t("popularProjects.title")}
          </div>
          <div className="text-muted-foreground">
            {t("popularProjects.desc")}
          </div>
        </div>
        <PopularProjects />
        <div className="flex flex-col items-center justify-center">
          {t("popularProjects.shareYourProject")}
          <Link
            href="https://discord.gg/indie-creators-hq-by-serudda-972567584580984852"
            rel="noopener"
            target="_blank"
          >
            <Button variant="link">{t("popularProjects.joinNow")}</Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-col lg:flex-row gap-16 py-16 ">
        <div className="w-full lg:w-2/5 gap-4 flex flex-col">
          <div className="text-3xl font-bold text-primary dark:text-primary lg:text-4xl xl:text-5xl">
            {t("faqs.title")}
          </div>
          <div className="text-muted-foreground text-justify">
            {t("faqs.desc")}
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <Faqs />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
