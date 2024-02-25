import { useEffect, useState } from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

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
  Separator,
  Skeleton,
  Spinner,
  Textarea,
  useToast,
} from "@/components";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DiscordLogo,
  FloppyDisk,
  Folder,
  Plus,
  Toolbox,
  Trash,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const Welcome: NextPage = () => {
  const { toast } = useToast();

  const { t } = useTranslation("common");

  const { data: sessionData, status } = useSession({ required: true });

  const userId = status === "authenticated" ? sessionData?.user?.id : "";

  const editProfileSchema = z.object({
    userId: z.string(),
    image: z.string().optional(),
    realName: z
      .string()
      .min(5, { message: "Real name must be at least 5 characters" })
      .regex(/^[\p{L}]+(?:\s[\p{L}]+)+$/u, { message: "Invalid Full Name" }),
    headline: z
      .string()
      .max(40, { message: t("editProfile.headlineMaxLength") })
      .optional(),
    about: z.string().optional(),
    links: z
      .array(
        z.object({
          name: z.string().min(1),
          url: z.string().url(),
          isNew: z.boolean().default(false),
        }),
      )
      .optional()
      .refine(
        (links) => {
          return (
            links === undefined ||
            links.every((link) => {
              if (!link.isNew) {
                return true;
              }
              const isNameEdited = link.name.trim().length > 0;
              const isUrlEdited = link.url.trim().length > 0;
              const isUrlValid = z.string().url().safeParse(link.url).success;

              return (
                (!isNameEdited || (isNameEdited && link.name.length >= 1)) &&
                (!isUrlEdited || (isUrlEdited && isUrlValid))
              );
            })
          );
        },
        {
          message: t("editProfile.linksValidation"),
        },
      ),
    onBoardingComplete: z.boolean(),
  });

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userId: userId,
      image: sessionData?.user?.image ?? "",
      realName: "",
      headline: "",
      about: "",
      links: [{ name: "", url: "" }],
      onBoardingComplete: true,
    },
  });

  useEffect(() => {
    if (sessionData) {
      form.setValue("userId", sessionData.user.id);
      form.setValue("image", sessionData.user.image ?? "");
    }
  }, [sessionData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const addLink = () => {
    append({ name: "", url: "", isNew: true });
  };

  const removeLink = (index: number) => {
    remove(index);
  };

  const formSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = async () => {
    let isValid = true;

    if (currentStep === 0) {
      isValid = await form.trigger(["realName"]);
    } else if (currentStep === 1) {
    }

    if (isValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepClass = (stepNumber: number) => {
    if (currentStep > stepNumber || (stepNumber === 2 && isSubmitting)) {
      return "bg-green-500";
    } else if (currentStep === stepNumber) {
      return "";
    } else {
      return "bg-border";
    }
  };

  const updateUserInfo = api.user.updateUserInfo.useMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isOnBoardingComplete, setIsOnBoardingComplete] = useState(false);

  const [counter, setCounter] = useState(10);
  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isOnBoardingComplete === true) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOnBoardingComplete]);

  useEffect(() => {
    if (counter === 0) {
      void router.push("/my/side-projects");
    }
  }, [counter, router]);

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    setIsSubmitting(true);
    updateUserInfo.mutate(values, {
      onSuccess: () => {
        setIsSubmitting(false);
        setIsOnBoardingComplete(true);
      },
      onError: () => {
        setIsSubmitting(false);
        setIsOnBoardingComplete(false);
        setCurrentStep(2);
        toast({
          title: t("editProfile.errorSaving"),
          description: t("editProfile.errorSavingDesc"),
          variant: "destructive",
        });
      },
    });
  }

  if (status === "loading") {
    return (
      <MainLayout>
        <Head>
          <title>{t("welcome.page")}</title>
        </Head>
        <div className="flex flex-col w-full items-center justify-center h-full gap-8">
          <div className="flex flex-col rounded-lg border w-full p-6 max-w-5xl gap-8 lg:flex-row">
            <div className="flex flex-col gap-8 lg:w-2/5 w-full">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex flex-col md:flex-row lg:flex-col gap-4">
                <div className="rounded-md border flex w-full lg:max-w-sm items-center px-4 py-3 gap-4">
                  <Skeleton className="rounded-full w-10 h-10 aspect-square" />
                  <div className="flex flex-col w-full gap-2">
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="rounded-md border w-full flex lg:max-w-sm items-center px-4 py-3 gap-4">
                  <Skeleton className="rounded-full w-10 h-10 aspect-square" />
                  <div className="flex flex-col w-full gap-2">
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <div className="rounded-md border w-full lg:max-w-sm flex items-center px-4 py-3 gap-4">
                  <Skeleton className="rounded-full w-10 h-10 aspect-square" />
                  <div className="flex flex-col w-full gap-2">
                    <Skeleton className="h-4 w-2/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </div>
            <Separator orientation="vertical" className="hidden lg:block" />
            <Separator className="block lg:hidden" />
            <div className="flex flex-col gap-8 lg:w-3/5 w-full">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-2/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-1/4" />
                      <div className="flex gap-4 items-center md:flex-row flex-col">
                        <Skeleton className="rounded-full w-28 h-28 aspect-square" />
                        <div className="flex flex-col gap-2 w-full">
                          <Skeleton className="h-9 w-4/5" />
                          <Skeleton className="h-4 w-2/4" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-1/6" />
                      <Skeleton className="h-9 w-full" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Skeleton className="h-10 w-32" />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (sessionData && status === "authenticated") {
    return (
      <MainLayout>
        <Head>
          <title>{t("welcome.page")}</title>
        </Head>
        <div className="flex flex-col w-full items-center justify-center h-full gap-8">
          {!isOnBoardingComplete ? (
            <div className="flex flex-col rounded-lg border w-full p-6 max-w-5xl gap-8 lg:flex-row">
              <div className="flex flex-col gap-8 lg:w-2/5 w-full">
                <div className="text-3xl font-bold">
                  {t("welcome.letsGetSetup")}
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-md border flex w-full md:max-w-fit lg:max-w-sm items-center px-4 py-3 gap-4">
                    <div
                      className={`border rounded-full w-10 h-10 flex items-center justify-center font-bold ${getStepClass(
                        0,
                      )}`}
                    >
                      {currentStep > 0 ? (
                        <Check className="w-5 h-5 text-white" weight="bold" />
                      ) : (
                        "1"
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.gettingStarted")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.gettingStartedDesc")}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border w-full flex md:max-w-fit lg:max-w-sm items-center px-4 py-3 gap-4">
                    <div
                      className={`border rounded-full w-10 h-10 flex items-center justify-center font-bold ${getStepClass(
                        1,
                      )}`}
                    >
                      {currentStep > 1 ? (
                        <Check className="w-5 h-5 text-white" weight="bold" />
                      ) : (
                        "2"
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.yourProfile")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.yourProfileDesc")}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border w-full md:max-w-fit lg:max-w-sm flex items-center px-4 py-3 gap-4">
                    <div
                      className={`border rounded-full w-10 h-10 flex items-center justify-center font-bold ${getStepClass(
                        2,
                      )}`}
                    >
                      {currentStep >= 2 && isSubmitting ? (
                        <Check className="w-5 h-5 text-white" weight="bold" />
                      ) : (
                        "3"
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.connect")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.connectDesc")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" className="hidden lg:block" />
              <Separator className="block lg:hidden" />
              <div className="flex flex-col gap-8 lg:w-3/5 w-full">
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-bold">
                    {currentStep === 0 && t("welcome.gettingStarted")}
                    {currentStep === 1 && t("welcome.yourProfile")}
                    {currentStep === 2 && t("welcome.connect")}
                  </div>
                  <div className="text-muted-foreground">
                    {currentStep === 0 && t("welcome.gettingStartedDesc2")}
                    {currentStep === 1 &&
                      t("welcome.yourProfileDesc2", {
                        name: form.getValues("realName").split(" ")[0],
                      })}
                    {currentStep === 2 && t("welcome.connectDesc2")}
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <div
                      className={`${
                        currentStep === 0 ? "block" : "hidden"
                      } flex flex-col gap-4`}
                    >
                      <FormItem>
                        <FormLabel>
                          {t("welcome.profilePicture")}{" "}
                          <small>{t("welcome.optional")}</small>
                        </FormLabel>
                        <FormControl>
                          <ImagePicker
                            initialValue={form.getValues("image")}
                            onChange={(newImageSrc) => {
                              form.setValue("image", newImageSrc);
                            }}
                            className="h-32 w-32"
                            hideInput={false}
                          />
                        </FormControl>
                      </FormItem>
                      <FormField
                        control={form.control}
                        name="realName"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel>{t("welcome.fullName")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("welcome.enterYourFullName")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`${
                        currentStep === 1 ? "block" : "hidden"
                      } flex flex-col gap-4`}
                    >
                      <FormField
                        control={form.control}
                        name="headline"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel>
                              {t("welcome.headline")}{" "}
                              <small>{t("welcome.optional")}</small>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("welcome.whatsYourTagline")}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel>
                              {t("welcome.about")}{" "}
                              <small>{t("welcome.optional")}</small>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t(
                                  "welcome.shareABitAboutYourself",
                                )}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div
                      className={`${currentStep === 2 ? "block" : "hidden"}`}
                    >
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
                                      <FormLabel>
                                        {t("welcome.linkName")}
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="GitHub"
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
                                      <FormLabel>
                                        {t("welcome.linkUrl")}
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="https://github.com/user"
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
                                onClick={() => removeLink(index)}
                              >
                                <Trash size={16} className="mr-2" />
                                {t("welcome.remove")}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="text-foreground hover:text-foreground/90 p-0"
                        onClick={addLink}
                      >
                        <Plus size={16} className="mr-2" />
                        {t("welcome.addLink")}
                      </Button>
                    </div>
                    <div
                      className={`flex gap-4 ${
                        currentStep > 0 ? "justify-between" : "justify-end"
                      }`}
                    >
                      {currentStep > 0 && (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={prevStep}
                        >
                          <ArrowLeft size={24} className="mr-2" />
                          {t("welcome.back")}
                        </Button>
                      )}
                      {currentStep < formSteps - 1 && (
                        <Button type="button" onClick={nextStep}>
                          {t("welcome.continue")}
                          <ArrowRight size={24} className="ml-2" />
                        </Button>
                      )}
                      {currentStep === formSteps - 1 && (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={() => console.log(form.getValues())}
                        >
                          {isSubmitting ? (
                            <>
                              {t("welcome.processing")}
                              <Spinner className="text-muted ml-2" />
                            </>
                          ) : (
                            <>
                              {t("welcome.finish")}
                              <FloppyDisk size={24} className="ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col rounded-lg border w-full p-6 max-w-lg gap-8 items-center justify-center">
              <div className="flex flex-col gap-4">
                <div className="text-3xl font-bold text-center text-pretty">
                  {t("welcome.welcomeAboard", {
                    name: form.getValues("realName").split(" ")[0],
                  })}
                </div>
                <div className="text-center text-muted-foreground">
                  {t("welcome.welcomeAboardDesc")}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/my/side-projects" rel="self">
                  <div className="rounded-md border flex items-center px-4 py-3 gap-4 cursor-pointer hover:border-primary">
                    <div className="border rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                      <Folder className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.showcaseYourWork")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.showcaseYourWorkDesc")}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/resources" rel="self">
                  <div className="rounded-md border flex items-center px-4 py-3 gap-4 cursor-pointer hover:border-primary">
                    <div className="border rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                      <Toolbox className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.shareAndDiscoverResources")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.shareAndDiscoverResourcesDesc")}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  href="https://discord.gg/indie-creators-hq-by-serudda-972567584580984852"
                  rel="noopener"
                  target="_blank"
                >
                  <div className="rounded-md border flex items-center px-4 py-3 gap-4 cursor-pointer hover:border-primary">
                    <div className="border rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                      <DiscordLogo className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {t("welcome.joinTheConversation")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("welcome.joinTheConversationDesc")}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="text-center">
                  {t("welcome.welcomeAboardDesc2")}
                </div>
                <div className="text-center text-muted-foreground">
                  {t("welcome.redirected", { counter: counter })}
                </div>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    );
  }
};

export default Welcome;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session && session.user.onBoardingComplete) {
    return {
      redirect: {
        destination: "/my/side-projects",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "es", ["common"])),
    },
  };
};
