import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  MainLayout,
  MemberCard,
  Skeleton,
} from "@/components";
import { api } from "@/utils/api";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Members: NextPage = () => {
  const { t } = useTranslation("common");

  const { data: users, isLoading: isLoadingUsers } = api.user.getAll.useQuery(
    undefined,
    { refetchOnWindowFocus: false },
  );

  if (isLoadingUsers) {
    return (
      <MainLayout>
        <Head>
          <title>{t("members.page")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8">
          <div className="flex flex-col w-full items-center justify-center gap-2 text-center py-6">
            <div className="text-3xl text-primary font-semibold">
              {t("members.title")}
            </div>
            <div className="flex flex-col items-center">
              <div>{t("members.desc")}</div>
              <div className="flex items-center">
                <div>{t("members.desc2")}</div>
                <Link
                  href="https://discord.gg/indie-creators-hq-by-serudda-972567584580984852"
                  rel="noopener"
                  target="_blank"
                >
                  <Button variant="link" className="py-0 px-1.5 h-fit">
                    {t("members.cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full">
            <Card className="w-72 flex flex-col justify-between">
              <CardHeader className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-64" />
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
            <Card className="w-72 flex flex-col justify-between">
              <CardHeader className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-64" />
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
            <Card className="w-72 flex flex-col justify-between">
              <CardHeader className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-64" />
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
            <Card className="w-72 flex flex-col justify-between">
              <CardHeader className="flex items-center">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-52" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-64" />
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (users) {
    return (
      <MainLayout>
        <Head>
          <title>{t("sideProjects.title")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8">
          <div className="flex flex-col w-full items-center justify-center gap-2 text-center py-6">
            <div className="text-3xl text-primary font-semibold">
              {t("members.title")}
            </div>
            <div className="flex flex-col items-center">
              <div>{t("members.desc")}</div>
              <div>
                {t("members.desc2")}
                <Link
                  href="https://discord.gg/indie-creators-hq-by-serudda-972567584580984852"
                  rel="noopener"
                  target="_blank"
                >
                  <Button variant="link" className="py-0 px-1.5 h-fit">
                    {t("members.cta")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full justify-center md:justify-start">
            {users.map((user) => (
              <MemberCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }
};

export default Members;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
