import { useEffect, useState } from "react";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  MainLayout,
  Skeleton,
} from "@/components";
import { api } from "@/utils/api";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UserProfile: NextPage = () => {
  const router = useRouter();

  const username = router.query.username as string;

  const { data: sessionData, status } = useSession();

  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    error,
  } = api.user.getUserByName.useQuery(
    { username },
    {
      enabled: !!username,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.message === "User not found") {
          return false;
        }
        return failureCount < 3;
      },
    },
  );

  const [userImage, setUserImage] = useState("");
  const [hasHeadline, setHasHeadline] = useState(false);
  const [hasAbout, setHasAbout] = useState(false);
  const [hasLinks, setHasLinks] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.image?.includes("/embed/avatars/")) {
        setUserImage("");
      } else {
        setUserImage(userInfo.image ?? "");
      }

      setHasHeadline(!!userInfo.headline);
      setHasAbout(!!userInfo.about);
      setHasLinks(userInfo.links.length > 0);
    }
  }, [userInfo]);

  const { t } = useTranslation("common");

  if (error) {
    return (
      <MainLayout>
        <Head>
          <title>Error | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full h-full items-center justify-center text-center text-2xl">
          Lo sentimos, no pudimos encontrar el perfil del usuario.
        </div>
      </MainLayout>
    );
  }

  if (status === "loading" || isLoadingUserInfo) {
    return (
      <MainLayout>
        <Head>
          <title>{username} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col rounded-lg border w-full p-6 max-w-3xl gap-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="h-32 w-32">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="h-8 w-2/4" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex gap-2 w-full">
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (status && userInfo) {
    return (
      <MainLayout>
        <Head>
          <title>{username} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col rounded-lg border w-full p-6 gap-8 max-w-3xl">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-8 flex-col md:flex-row items-center md:items-start text-center md:text-start">
              <Avatar className="border h-32 w-32">
                <AvatarImage src={userImage} alt="User profile picture" />
                <AvatarFallback className="text-7xl">
                  {userInfo?.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="text-4xl text-primary font-semibold">
                    {userInfo.realName}
                  </div>
                  <div className="text-muted-foreground">@{userInfo.name}</div>
                </div>
                {hasHeadline && <div>{userInfo.headline}</div>}
                <div className="text-muted-foreground">
                  {userInfo.sideProjectCount === 0
                    ? t("editProfile.noSideProjectsYet")
                    : `${userInfo.sideProjectCount} ${t(
                        "editProfile.sideProject",
                      )}${userInfo.sideProjectCount > 1 ? "s" : ""} ✨`}
                </div>
              </div>
            </div>
            {status === "authenticated" && (
              <Link href="/edit-profile">
                <Button>{t("members.editProfile")}</Button>
              </Link>
            )}
          </div>
          {(hasAbout || hasLinks) && (
            <div className="flex flex-col gap-8">
              {hasAbout && (
                <div className="flex flex-col gap-1">
                  <div className="text-xl font-semibold">
                    {t("editProfile.about")}
                  </div>
                  <div>{userInfo.about}</div>
                </div>
              )}
              {hasLinks && (
                <div className="flex flex-col gap-1">
                  <div className="text-xl font-semibold">
                    {t("editProfile.links")}
                  </div>
                  <div className="flex gap-4">
                    {userInfo.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        rel="noopener"
                        target="_self"
                      >
                        <Button variant="link" className="px-0 text-foreground">
                          {link.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </MainLayout>
    );
  }
};

export default UserProfile;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
