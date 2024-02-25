import { useEffect, useState } from "react";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImagePicker,
  Input,
  MainLayout,
  Skeleton,
  Spinner,
  Textarea,
  useToast,
} from "@/components";
import { api } from "@/utils/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { FloppyDisk, Plus, Trash } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const EditProfile: NextPage = () => {
  const { toast } = useToast();

  const { t } = useTranslation("common");

  const { data: sessionData, status } = useSession({ required: true });

  const userId = status === "authenticated" ? sessionData?.user?.id : "";

  const { data: userInfo, isLoading } = api.user.getUserById.useQuery(
    { userId },
    {
      enabled: userId !== "",
    },
  );

  const editProfileSchema = z.object({
    userId: z.string(),
    image: z.string().optional(),
    realName: z.string().min(2, { message: t("editProfile.realNameRequired") }),
    headline: z
      .string()
      .max(40, { message: t("editProfile.headlineMaxLength") })
      .optional(),
    about: z.string().optional(),
    links: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, { message: t("editProfile.linkNameRequired") }),
          url: z.string().url({ message: t("editProfile.linkUrlRequired") }),
        }),
      )
      .refine((data) => data.filter((link) => link.name && link.url)),
  });

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userId: "",
      image: "",
      realName: "",
      headline: "",
      about: "",
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        userId: userId,
        image: userInfo.image?.includes("/embed/avatars/")
          ? ""
          : userInfo.image ?? "",
        realName: userInfo.realName ?? "",
        headline: userInfo.headline ?? "",
        about: userInfo.about ?? "",
        links: userInfo.links ?? [],
      });
    }
  }, [userInfo, userId, form]);

  const addLink = () => append({ name: "", url: "" });

  const updateUserInfo = api.user.updateUserInfo.useMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    setIsSubmitting(true);
    updateUserInfo.mutate(values, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast({
          title: t("editProfile.changesSaved"),
          description: t("editProfile.changesSavedDesc"),
        });
      },
      onError: () => {
        setIsSubmitting(false);
        toast({
          title: t("editProfile.errorSaving"),
          description: t("editProfile.errorSavingDesc"),
          variant: "destructive",
        });
      },
    });
  }

  if (isLoading || status === "loading") {
    return (
      <MainLayout>
        <Head>
          <title>{t("editProfile.page")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col rounded-lg border w-full p-6 max-w-3xl gap-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="h-32 w-32">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-2/5">
                <Skeleton className="h-4 w-2/6" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-col gap-2 w-3/5">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-2/5">
                <Skeleton className="h-4 w-2/6" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-col gap-2 w-3/5">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (userInfo && status === "authenticated") {
    return (
      <MainLayout>
        <Head>
          <title>{t("editProfile.page")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col rounded-lg border w-full p-6 max-w-3xl gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <FormItem>
                  <FormControl>
                    <ImagePicker
                      initialValue={form.getValues("image")}
                      onChange={(newImageSrc) => {
                        form.setValue("image", newImageSrc);
                      }}
                      className="h-32 w-32"
                    />
                  </FormControl>
                </FormItem>
                <div className="flex flex-col gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="realName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>{t("editProfile.name")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("editProfile.name")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>{t("editProfile.headline")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("editProfile.headline")}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>{t("editProfile.about")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("editProfile.about")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-start">
                <div className="flex flex-col gap-4 w-full">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex flex-col items-start md:flex-row"
                    >
                      <div className="flex flex-col md:gap-4 gap-2 w-full md:flex-row">
                        <FormField
                          control={form.control}
                          name={`links.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>{t("editProfile.linkName")}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("editProfile.linkName")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`links.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex flex-col grow">
                              <FormLabel>{t("editProfile.linkUrl")}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("editProfile.linkUrl")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        variant="link"
                        className="text-muted-foreground hover:text-destructive px-0 md:px-4 md:mt-5"
                        onClick={() => remove(index)}
                      >
                        <Trash size={16} className="mr-2" />
                        {t("editProfile.remove")}
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  className="text-foreground hover:text-foreground/90 p-0"
                  onClick={addLink}
                >
                  <Plus size={16} className="mr-2" />
                  {t("editProfile.addLink")}
                </Button>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner className="text-muted mr-2" />
                    {t("mySideProjects.processing")}
                  </>
                ) : (
                  <>
                    <FloppyDisk size={24} className="mr-2" />
                    {t("editProfile.save")}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </MainLayout>
    );
  }
};

export default EditProfile;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
