import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

import { ArrowUpRight, Info } from "@phosphor-icons/react";
import { type SideProject, Status } from "@prisma/client";
import { useTranslation } from "next-i18next";

type PublicSideProjectCardProps = {
  sideProject: SideProject;
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

export const PublicSideProjectCard = ({
  sideProject,
}: PublicSideProjectCardProps): JSX.Element => {
  const { t } = useTranslation("common");

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
              {sideProject.status}
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
      <CardFooter className="justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0}>
                <Button size="icon" variant="outline" disabled>
                  <Info className="h-6 w-6" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div>{t("popularProjects.comingSoon")}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link href={sideProject.url} rel="noopener" target="_blank">
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            {t("popularProjects.use")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
