import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  MainLayout,
  PublicSideProjectCard,
  Skeleton,
} from "@/components";
import { api } from "@/utils/api";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SideProjects: NextPage = () => {
  const { t } = useTranslation("common");

  const { data: sideProjects, isLoading: isLoadingSideProjects } =
    api.sideProject.getAll.useQuery(undefined, { refetchOnWindowFocus: false });

  if (isLoadingSideProjects) {
    return (
      <MainLayout>
        <Head>
          <title>{t("sideProjects.page")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8">
          <div className="flex flex-col w-full items-center justify-center gap-2 text-center py-6">
            <div className="text-3xl text-primary font-semibold">
              {t("sideProjects.title")}
            </div>
            <div className="flex flex-col items-center">
              <div>{t("sideProjects.desc")}</div>
              <div className="flex items-center">
                <div>{t("sideProjects.desc2")}</div>
                <Link href="/my-side-projects">
                  <Button variant="link" className="py-0 px-1.5 h-fit">
                    {t("sideProjects.cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full">
            <Card className="h-[180px] w-full max-w-sm shrink-0">
              <CardHeader>
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
            <Card className="h-[180px] w-full max-w-sm shrink-0">
              <CardHeader>
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
            <Card className="h-[180px] w-full max-w-sm shrink-0">
              <CardHeader>
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (sideProjects) {
    return (
      <MainLayout>
        <Head>
          <title>{t("sideProjects.title")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8">
          <div className="flex flex-col w-full items-center justify-center gap-2 text-center py-6">
            <div className="text-3xl text-primary font-semibold">
              {t("sideProjects.title")}
            </div>
            <div className="flex flex-col items-center">
              <div>{t("sideProjects.desc")}</div>
              <div>
                {t("sideProjects.desc2")}
                <Link href="/my-side-projects">
                  <Button variant="link" className="py-0 px-1.5 h-fit">
                    {t("sideProjects.cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full">
            {sideProjects.map((sideProject) => (
              <PublicSideProjectCard
                key={sideProject.id}
                sideProject={sideProject}
              />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }
};

export default SideProjects;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
