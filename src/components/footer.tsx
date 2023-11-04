import { Heart } from "@phosphor-icons/react";
import { useTranslation } from "next-i18next";

export const Footer = (): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <footer className="flex items-center justify-center gap-1 px-4 py-3 text-center text-sm lg:text-base xl:px-40">
      <div>{t("footer.madeWith")}</div>
      <Heart weight="fill" className="h-5 w-5 text-red-500 lg:h-6 lg:w-6" />
      <div>{t("footer.by")}</div>
      <a
        href="https://github.com/Indie-Creator-Community"
        target="_blank"
        rel="noreferrer"
      >
        Indie Creators HQ
      </a>
    </footer>
  );
};
