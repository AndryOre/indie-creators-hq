import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  Avatar,
  AvatarImage,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/";
import popularSideProjectsData from "@/data/popularProjects.json";

import { ArrowUpRight, Info } from "@phosphor-icons/react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "next-i18next";

interface SideProject {
  logo: string;
  name: string;
  tagline: string;
  url: string;
}

const popularSideProjects: SideProject[] =
  popularSideProjectsData as SideProject[];

export function PopularProjects(): JSX.Element {
  const { t } = useTranslation("common");

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      setApi={setApi}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full"
    >
      <CarouselContent className="-ml-8">
        {popularSideProjects.map((sideProject: SideProject) => (
          <CarouselItem key={sideProject.name} className="pl-8 sm:basis-96">
            <Card className="h-[180px] w-full max-w-sm shrink-0 transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-2 justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={sideProject?.logo ?? ""} />
                    </Avatar>
                    <CardTitle className="truncate">
                      {sideProject.name}
                    </CardTitle>
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-2 justify-center my-4">
        {popularSideProjects.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 cursor-pointer rounded-full ${
              index === current - 1 ? "bg-primary" : "bg-muted-foreground"
            }`}
            onClick={() => api?.scrollTo(index)}
          ></div>
        ))}
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
