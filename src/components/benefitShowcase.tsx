import {
  Badge,
  DiscordImg,
  LaunchBoostImg,
  Shimmer,
  SpReviewImg,
} from "@/components";

import { useTranslation } from "next-i18next";

export const BenefitShowcase = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8 w-full items-center">
        <div className="md:w-1/2 flex flex-col gap-2">
          <Shimmer className="rounded-xl">
            <Badge
              variant="outline"
              className="w-fit shadow-[0_0_4px_0px_#6066af] dark:shadow-[0_0_4px_0px_#ffff66]"
            >
              {t("communityBenefits.projectReviewsTag")}
            </Badge>
          </Shimmer>
          <div className="font-medium text-4xl">
            {t("communityBenefits.projectReviewsTitle")}
          </div>
          <div className="text-muted-foreground">
            {t("communityBenefits.projectReviewsDesc")}
          </div>
        </div>
        <div className="md:w-1/2">
          <SpReviewImg />
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-8 w-full items-center">
        <div className="md:w-1/2 flex flex-col gap-2">
          <Shimmer className="rounded-xl">
            <Badge
              variant="outline"
              className="w-fit shadow-[0_0_4px_0px_#6066af] dark:shadow-[0_0_4px_0px_#ffff66]"
            >
              {t("communityBenefits.launchBoostTag")}
            </Badge>
          </Shimmer>
          <div className="font-medium text-4xl">
            {t("communityBenefits.launchBoostTitle")}
          </div>
          <div className="text-muted-foreground">
            {t("communityBenefits.launchBoostDesc")}
          </div>
        </div>
        <div className="md:w-1/2">
          <LaunchBoostImg />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full items-center">
        <div className="md:w-1/2 flex flex-col gap-2">
          <Shimmer className="rounded-xl">
            <Badge
              variant="outline"
              className="w-fit shadow-[0_0_4px_0px_#6066af] dark:shadow-[0_0_4px_0px_#ffff66]"
            >
              {t("communityBenefits.activeDiscordTag")}
            </Badge>
          </Shimmer>

          <div className="font-medium text-4xl">
            {t("communityBenefits.activeDiscordTitle")}
          </div>
          <div className="text-muted-foreground">
            {t("communityBenefits.activeDiscordDesc")}
          </div>
        </div>
        <div className="md:w-1/2">
          <DiscordImg />
        </div>
      </div>
    </div>
  );
};
