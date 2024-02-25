import { useEffect, useState } from "react";

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  MainLayout,
  SideProjectForm,
  Skeleton,
  Spinner,
  UserSideProjectCard,
  useToast,
} from "@/components";
import type {
  EditSideProjectFormData,
  SideProjectFormData,
} from "@/components/sideProjectForm";
import { api } from "@/utils/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { FloppyDisk, Plus } from "@phosphor-icons/react";
import { Status } from "@prisma/client";
import { type SideProject } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const MySideProjects: NextPage = () => {
  const { t } = useTranslation("common");

  const utils = api.useContext();

  const { data: sessionData, status } = useSession({ required: true });
  const userId = status === "authenticated" ? sessionData?.user?.id : "";

  const { data: sideProjects, isLoading: isLoadingSideProjects } =
    api.sideProject.getByUser.useQuery(
      { userId },
      { enabled: !!userId, refetchOnWindowFocus: false },
    );

  const [hasSideProjects, setHasSideProjects] = useState(false);

  useEffect(() => {
    if (sideProjects) {
      setHasSideProjects(sideProjects.length > 0);
    }
  }, [sideProjects]);

  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const addSideProject = api.sideProject.create.useMutation();

  const [formDefaultValues, setFormDefaultValues] =
    useState<SideProjectFormData>({
      userId: userId,
      logo: "",
      url: "",
      name: "",
      tagline: "",
      status: Status.Active,
    });

  const openNewSideProjectForm = () => {
    const newSideProjectDefaultValues = {
      userId: userId,
      logo: "",
      url: "",
      name: "",
      tagline: "",
      status: Status.Active,
    };
    setFormDefaultValues(newSideProjectDefaultValues);
    formMethods.reset(newSideProjectDefaultValues);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const sideProjectSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    logo: z.string().min(1, { message: t("mySideProjects.logoRequired") }),
    url: z.string().url({ message: t("mySideProjects.urlRequired") }),
    name: z.string().min(2, { message: t("mySideProjects.nameRequired") }),
    tagline: z
      .string()
      .min(10, { message: t("mySideProjects.taglineRequired") }),
    status: z.nativeEnum(Status),
  });

  const formMethods = useForm<SideProjectFormData>({
    resolver: zodResolver(sideProjectSchema),
    defaultValues: formDefaultValues,
  });

  const handleAddSideProject = (sideProjectData: SideProjectFormData) => {
    setIsSubmitting(true);
    addSideProject.mutate(sideProjectData, {
      onError: (error) => {
        setIsSubmitting(false);
        if (
          error.message === "A side project with the given URL already exists."
        ) {
          toast({
            variant: "destructive",
            description: t("mySideProjects.alredyExist"),
          });
        } else {
          toast({
            variant: "destructive",
            description: error.message,
          });
        }
      },
      onSuccess: () => {
        setIsSubmitting(false);
        void utils.sideProject.getByUser.invalidate();
        formMethods.reset();
        setIsDialogOpen(false);
        toast({
          title: t("mySideProjects.createdTitle"),
          description: t("mySideProjects.createdDesc"),
        });
      },
    });
  };

  const updateSideProject = api.sideProject.update.useMutation();

  const openEditSideProjectForm = (sideProject: SideProject) => {
    const editValues: EditSideProjectFormData = {
      id: sideProject.id,
      userId: sideProject.userId,
      logo: sideProject.logo,
      url: sideProject.url,
      name: sideProject.name,
      tagline: sideProject.tagline,
      status: sideProject.status,
    };
    setIsEditMode(true);
    setFormDefaultValues(editValues);
    formMethods.reset(editValues);
    setIsDialogOpen(true);
  };

  const handleEditSideProject = (sideProject: EditSideProjectFormData) => {
    setIsSubmitting(true);
    updateSideProject.mutate(sideProject, {
      onError: (error) => {
        setIsSubmitting(false);
        toast({
          variant: "destructive",
          description: error.message,
        });
      },
      onSuccess: () => {
        setIsSubmitting(false);
        void utils.sideProject.getByUser.invalidate();
        setIsDialogOpen(false);
        toast({
          title: t("mySideProjects.updatedTitle"),
          description: t("mySideProjects.updatedDesc"),
        });
      },
    });
  };

  const handleSubmitForm = () => {
    void formMethods.handleSubmit((formData: SideProjectFormData) => {
      if (isEditMode) {
        handleEditSideProject(formData as EditSideProjectFormData);
      } else {
        handleAddSideProject(formData);
      }
    })();
  };

  const deleteSideProject = api.sideProject.delete.useMutation();

  const handleDeleteSideProject = (sideProjectId: string) => {
    deleteSideProject.mutate(
      { id: sideProjectId },
      {
        onError: (error) => {
          toast({
            variant: "destructive",
            description: error.message,
          });
        },
        onSuccess: () => {
          void utils.sideProject.getByUser.invalidate();
          toast({
            title: t("mySideProjects.deletedTitle"),
            description: t("mySideProjects.deletedDesc"),
          });
        },
      },
    );
  };

  if (status === "loading" || isLoadingSideProjects) {
    return (
      <MainLayout>
        <Head>
          <title>{t("mySideProjects.title")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8 md:gap-4">
          <div className="flex flex-col w-full md:flex-row justify-between gap-2 py-6">
            <div className="flex flex-col">
              <div className="text-3xl text-primary font-semibold">
                {t("mySideProjects.title")}
              </div>
              <div>{t("mySideProjects.desc")}</div>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap w-full">
            <Card className="h-[180px] w-full max-w-sm shrink-0">
              <CardHeader>
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-20 rounded-full" />
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
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-20 rounded-full" />
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
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-20 rounded-full" />
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

  if (status === "authenticated" && sideProjects) {
    return (
      <MainLayout>
        <Head>
          <title>{t("mySideProjects.page")} | Indie Creators HQ</title>
        </Head>
        <div className="flex flex-col w-full items-start justify-start h-full gap-8 md:gap-4">
          <div className="flex flex-col w-full md:flex-row justify-between gap-2 py-6">
            <div className="flex flex-col">
              <div className="text-3xl text-primary font-semibold">
                {t("mySideProjects.title")}
              </div>
              <div>{t("mySideProjects.desc")}</div>
            </div>
            {hasSideProjects && (
              <Button onClick={openNewSideProjectForm}>
                <Plus size={24} className="mr-2" />
                {t("mySideProjects.addSideProject")}
              </Button>
            )}
          </div>
          {hasSideProjects ? (
            <div className="flex gap-4 flex-wrap w-full">
              {sideProjects.map((sideProject) => (
                <UserSideProjectCard
                  key={sideProject.id}
                  sideProject={sideProject}
                  onEdit={openEditSideProjectForm}
                  onDelete={handleDeleteSideProject}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
              <div className="text-center">
                <div className="text-xl">
                  {t("mySideProjects.noSideProjectsTitle")}
                </div>
                <div className="text-muted-foreground">
                  {t("mySideProjects.noSideProjectsDesc")}
                </div>
              </div>
              <Button onClick={openNewSideProjectForm}>
                <Plus size={24} className="mr-2" />
                {t("mySideProjects.addSideProject")}
              </Button>
            </div>
          )}
          <FormProvider {...formMethods}>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditMode
                      ? t("mySideProjects.editSideProject")
                      : t("mySideProjects.newSideProject")}
                  </DialogTitle>
                </DialogHeader>
                <SideProjectForm
                  defaultValues={formDefaultValues}
                  onSubmit={handleSubmitForm}
                />
                <DialogFooter className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">
                      {t("mySideProjects.cancel")}
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={handleSubmitForm}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="text-muted mr-2" />
                        {t("mySideProjects.processing")}
                      </>
                    ) : isEditMode ? (
                      <>
                        <FloppyDisk size={24} className="mr-2" />
                        {t("mySideProjects.save")}
                      </>
                    ) : (
                      <>
                        <Plus size={24} className="mr-2" />
                        {t("mySideProjects.addSideProject")}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </FormProvider>
        </div>
      </MainLayout>
    );
  }
};

export default MySideProjects;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
