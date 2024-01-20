import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImagePicker,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";

import { type Status } from "@prisma/client";
import { useTranslation } from "next-i18next";
import { type SubmitHandler, useFormContext } from "react-hook-form";

export type EditSideProjectFormData = {
  id: string;
  userId: string;
  logo: string;
  url: string;
  name: string;
  tagline: string;
  status: Status;
};

export type SideProjectFormData = Omit<EditSideProjectFormData, "id">;

type SideProjectFormProps = {
  defaultValues: SideProjectFormData;
  onSubmit: SubmitHandler<SideProjectFormData>;
};

export const SideProjectForm = ({
  onSubmit,
}: SideProjectFormProps): JSX.Element => {
  const { t } = useTranslation("common");

  const form = useFormContext<SideProjectFormData>();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="logo">{t("mySideProjects.logo")}</FormLabel>
              <FormControl>
                <ImagePicker
                  initialValue={field.value}
                  onChange={(newImageSrc) => {
                    form.setValue("logo", newImageSrc, {
                      shouldValidate: true,
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="url">{t("mySideProjects.url")}</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  id="url"
                  placeholder={t("mySideProjects.url")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="name">{t("mySideProjects.name")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="name"
                  placeholder={t("mySideProjects.name")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="tagline">
                {t("mySideProjects.tagline")}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="tagline"
                  placeholder={t("mySideProjects.tagline")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor="status">
                {t("mySideProjects.status")}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("mySideProjects.statusSelect")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.active")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Building">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.building")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500"></div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Discontinued">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.discontinued")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Acquired">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.acquired")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Inactive">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.inactive")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-500"></div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Sale">
                    <div className="flex items-center gap-2">
                      <div>{t("mySideProjects.sale")}</div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500"></div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
