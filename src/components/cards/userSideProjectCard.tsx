import { useEffect, useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components";

import { PencilSimple, Trash } from "@phosphor-icons/react";
import { type SideProject, Status } from "@prisma/client";
import { useTranslation } from "next-i18next";

type UserSideProjectCardProps = {
  sideProject: SideProject;
  onEdit: (project: SideProject) => void;
  onDelete: (id: string) => void;
};

export const UserSideProjectCard = ({
  sideProject,
  onEdit,
  onDelete,
}: UserSideProjectCardProps): JSX.Element => {
  const { t } = useTranslation("common");

  const statusTranslate = {
    [Status.Active]: "mySideProjects.active",
    [Status.Building]: "mySideProjects.building",
    [Status.Discontinued]: "mySideProjects.discontinued",
    [Status.Acquired]: "mySideProjects.acquired",
    [Status.Inactive]: "mySideProjects.inactive",
    [Status.Sale]: "mySideProjects.sale",
  };

  const statusClasses = {
    [Status.Active]: "bg-green-500",
    [Status.Building]: "bg-indigo-500",
    [Status.Discontinued]: "bg-red-500",
    [Status.Acquired]: "bg-yellow-500",
    [Status.Inactive]: "bg-zinc-500",
    [Status.Sale]: "bg-cyan-500",
  };

  const borderClasses = {
    [Status.Active]: "hover:border-green-500/50",
    [Status.Building]: "hover:border-indigo-500/50",
    [Status.Discontinued]: "hover:border-red-500/50",
    [Status.Acquired]: "hover:border-yellow-500/50",
    [Status.Inactive]: "hover:border-zinc-500/50",
    [Status.Sale]: "hover:border-cyan-500/50",
  };

  const badgeRef = useRef<HTMLDivElement>(null);

  const [badgeWidth, setBadgeWidth] = useState(0);

  useEffect(() => {
    if (badgeRef.current) {
      setBadgeWidth(badgeRef.current.offsetWidth);
    }
  }, [sideProject.status]);

  const badgeWidthCalc = {
    width: `calc(100% - ${badgeWidth}px)`,
  };

  return (
    <Card
      className={`h-[180px] w-full max-w-sm shrink-0 transition-colors ${
        borderClasses[sideProject.status]
      }`}
    >
      <CardHeader>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex items-center gap-2" style={badgeWidthCalc}>
            <Avatar>
              <AvatarImage src={sideProject?.logo} />
            </Avatar>
            <CardTitle className="truncate">{sideProject.name}</CardTitle>
          </div>
          <div ref={badgeRef}>
            <Badge variant="outline" className="flex items-center gap-2">
              {t(statusTranslate[sideProject.status])}
              <div
                className={`h-2 w-2 animate-pulse rounded-full ${
                  statusClasses[sideProject.status]
                }`}
              ></div>
            </Badge>
          </div>
        </div>

        <CardDescription className="truncate">
          {sideProject.tagline}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              {t("mySideProjects.remove")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("mySideProjects.deleteTitle")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("mySideProjects.deleteDesc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {t("mySideProjects.cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => onDelete(sideProject.id)}
              >
                {t("mySideProjects.remove")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" onClick={() => onEdit(sideProject)}>
          <PencilSimple className="mr-2 h-4 w-4" />
          {t("mySideProjects.edit")}
        </Button>
      </CardFooter>
    </Card>
  );
};
