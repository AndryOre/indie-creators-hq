import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

import { Button, MainLayout } from "@/components";

import { DiscordLogo } from "@phosphor-icons/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  return (
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
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
