import { useEffect, useState } from "react";

import type { GetStaticProps, NextPage } from "next";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
  MainLayout,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  useToast,
} from "@/components";
import { api } from "@/utils/api";

import { FloppyDisk, Plus, Trash, User } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Link {
  name: string;
  url: string;
}

const AccountSettings: NextPage = () => {
  const { toast } = useToast();

  const { t } = useTranslation("common");

  const { data: sessionData, status } = useSession({ required: true });

  const userId = status === "authenticated" ? sessionData?.user?.id : "";

  const { data: userInfo, isLoading } = api.user.getUserInfo.useQuery(
    { userId },
    {
      enabled: userId !== "",
    },
  );

  const [headline, setHeadline] = useState(userInfo?.headline ?? "");
  const [about, setAbout] = useState(userInfo?.about ?? "");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (userInfo) {
      setHeadline(userInfo.headline ?? "");
      setAbout(userInfo.about ?? "");
      setLinks(userInfo.links);
    }
  }, [userInfo]);

  const handleAddLink = () => {
    const newLinks = [...links, { name: "", url: "" }];
    setLinks(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleUpdateLink = (
    index: number,
    field: keyof Link,
    value: string,
  ) => {
    const updatedLinks: Link[] = links.map((link, i): Link => {
      if (i === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    setLinks(updatedLinks);
  };

  const updateUserInfo = api.user.updateUserInfo.useMutation();

  const handleSave = () => {
    const validLinks = links.filter(
      (link) => link.name.trim() !== "" && link.url.trim() !== "",
    );

    const payload = {
      userId,
      headline: headline !== userInfo?.headline ? headline : userInfo?.headline,
      about: about !== userInfo?.about ? about : userInfo?.about,
      links: validLinks,
    };

    updateUserInfo.mutate(payload, {
      onSuccess: () => {
        toast({
          title: t("accountSettings.changesSaved"),
          description: t("accountSettings.changesSavedDesc"),
        });
      },
      onError: () => {
        toast({
          title: t("accountSettings.errorSaving"),
          description: t("accountSettings.errorSavingDesc"),
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading || status === "loading") {
    return (
      <MainLayout>
        <div className="flex flex-col rounded-lg border w-full p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (userInfo && status === "authenticated") {
    return (
      <MainLayout>
        <div className="flex flex-col rounded-lg border w-full p-6">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">
                {t("accountSettings.profile")}
                <User size={18} className="ml-2" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <Avatar className="border-[1px]">
                    <AvatarImage
                      src={userInfo?.image ?? ""}
                      alt="User profile picture"
                    />
                    <AvatarFallback>
                      {userInfo?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>{userInfo?.name}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="headline">
                    {t("accountSettings.headline")}
                  </Label>
                  <Input
                    type="text"
                    id="headline"
                    placeholder="Headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="about">{t("accountSettings.about")}</Label>
                  <Textarea
                    id="about"
                    placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 items-start md:gap-4">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-start w-full md:flex-row"
                    >
                      <div className="flex flex-col gap-2 w-full md:flex-row">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={`linkName-${index}`}>
                            {t("accountSettings.linkName")}
                          </Label>
                          <Input
                            type="text"
                            id={`linkName-${index}`}
                            placeholder="Link Name"
                            value={link.name}
                            onChange={(e) =>
                              handleUpdateLink(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col grow gap-2">
                          <Label htmlFor={`linkUrl-${index}`}>
                            {t("accountSettings.linkUrl")}
                          </Label>
                          <Input
                            type="url"
                            id={`linkUrl-${index}`}
                            placeholder="Link URL"
                            value={link.url}
                            onChange={(e) =>
                              handleUpdateLink(index, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="text-muted-foreground hover:text-destructive px-0 md:px-4 md:mt-5"
                        aria-label="Remove link"
                        onClick={() => handleRemoveLink(index)}
                      >
                        <Trash size={16} className="mr-2" />
                        {t("accountSettings.remove")}
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="link"
                    aria-label="Add link"
                    className="text-foreground hover:text-foreground/90 pl-0"
                    onClick={handleAddLink}
                  >
                    <Plus size={16} className="mr-2" />
                    {t("accountSettings.addLink")}
                  </Button>
                </div>
              </div>
              <div className="dark:hidden">
                <Button variant="secondary" onClick={handleSave}>
                  <FloppyDisk size={24} className="mr-2" />
                  Save
                </Button>
              </div>
              <div className="hidden dark:block">
                <Button onClick={handleSave}>
                  <FloppyDisk size={24} className="mr-2" />
                  {t("accountSettings.save")}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    );
  }
};

export default AccountSettings;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
