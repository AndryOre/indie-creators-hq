import Image from "next/image";

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
  Carousel,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/";
import popularProjectsData from "@/data/popularProjects.json";
import { api } from "@/utils/api";

import ProductHuntLogo from "../../public/assets/product-hunt-logo.png";

import {
  ArrowUpRight,
  CaretUp,
  Info,
  WarningCircle,
} from "@phosphor-icons/react";
import { useTranslation } from "next-i18next";

interface Project {
  logo: string;
  name: string;
  tagline: string;
  url: string;
  productHuntSlug?: string;
}

const popularProjects: Project[] = popularProjectsData as Project[];

export function PopularProjects(): JSX.Element {
  const { t } = useTranslation("common");

  const votesCount = (slug: string | undefined) => {
    if (!slug) {
      return <WarningCircle className="h-5 w-5 text-destructive" />;
    }

    const votes = api.productHuntVotes.getBySlug.useQuery(
      { slug },
      { refetchOnWindowFocus: false },
    );

    if (
      votes.data &&
      typeof votes.data === "object" &&
      "votesCount" in votes.data
    ) {
      return votes.data.votesCount;
    } else if (votes.data === "Post not found") {
      return <WarningCircle className="h-5 w-5 text-destructive" />;
    } else {
      return <Spinner />;
    }
  };

  return (
    <Carousel>
      {popularProjects.map((project: Project) => (
        <Card key={project.name} className="h-[180px] w-full max-w-sm shrink-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={project.logo} />
                </Avatar>
                <CardTitle>{project.name}</CardTitle>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 p-1"
                    >
                      <Image
                        src={ProductHuntLogo}
                        className="h-5 w-5"
                        alt="Product Hunt Logo"
                      />
                      {votesCount(project.productHuntSlug)}
                      <CaretUp weight="fill" className="h-4 w-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>{t("popularProjects.productHuntVotes")}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription className="truncate">
              {project.tagline}
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
            <Button>
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {t("popularProjects.use")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Carousel>
  );
}
