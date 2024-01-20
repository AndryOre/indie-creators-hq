import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";

import IndieCreatorsHQDark from "../../public/assets/Indie_Creatos_HQ_Logo_Dark.svg";
import IndieCreatorsHQLight from "../../public/assets/Indie_Creatos_HQ_Logo_Light.svg";

import {
  DiscordLogo,
  Folder,
  Gear,
  IdentificationCard,
  List,
  Monitor,
  Moon,
  SignOut,
  Sun,
  Translate,
  X,
} from "@phosphor-icons/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

export const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const pathname = usePathname();

  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    void router.push(router.pathname, router.pathname, { locale: lang });
    setLang(lang);
  };

  const { data: sessionData, status } = useSession();

  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (sessionData) {
      if (sessionData?.user.image?.includes("/embed/avatars/")) {
        setUserImage("");
      } else {
        setUserImage(sessionData?.user.image ?? "");
      }
    }
  }, [sessionData]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex w-full flex-col items-center justify-between px-4 py-3 xl:flex-row xl:px-40 backdrop-blur-sm bg-background/80">
        <div className="flex w-full items-center justify-between xl:w-auto">
          <Link href="/">
            <Image
              src={IndieCreatorsHQLight as string}
              alt="Indie Creators HQ"
              className="h-12 w-auto dark:hidden"
            />
            <Image
              src={IndieCreatorsHQDark as string}
              alt="Indie Creators HQ"
              className="hidden h-12 w-auto dark:block"
            />
          </Link>
          <div className="xl:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label={
                isMenuOpen ? t("header.closeMenu") : t("header.openMenu")
              }
            >
              {!isMenuOpen === true ? (
                <List weight="regular" className="h-5 w-5" />
              ) : (
                <X weight="regular" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <nav className="gap-8 items-center hidden xl:flex font-medium">
          <Link
            href="/side-projects"
            className={cn(
              "transition-colors hover:text-primary",
              pathname?.startsWith("/side-projects")
                ? "text-primary"
                : "text-foreground",
            )}
          >
            {t("header.projects")}
          </Link>
          <Link
            href="/members"
            className={cn(
              "transition-colors hover:text-primary",
              pathname?.startsWith("/members")
                ? "text-primary"
                : "text-foreground",
            )}
          >
            {t("header.members")}
          </Link>
        </nav>
        <div className="hidden items-center gap-4 font-medium xl:flex">
          <div className="flex gap-4 items-center">
            {status === "authenticated" ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  <Avatar className="border">
                    <AvatarImage src={userImage} alt="User profile picture" />
                    <AvatarFallback>
                      {sessionData.user?.name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {sessionData.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-muted-foreground">
                    <Link
                      href={`/user/${sessionData.user?.name}`}
                      className="flex w-full items-center justify-between gap-8"
                    >
                      {t("header.profile")} <IdentificationCard size={16} />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground">
                    <Link
                      href="/my-side-projects"
                      className="flex w-full items-center justify-between gap-8"
                    >
                      {t("header.mySideProjects")} <Folder size={16} />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-muted-foreground">
                    <Link
                      href="/edit-profile"
                      className="flex w-full items-center justify-between gap-8"
                    >
                      {t("header.settings")} <Gear size={16} />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex w-full items-center justify-between text-muted-foreground gap-8"
                    onClick={() => void signOut()}
                  >
                    {t("header.signOut")} <SignOut size={16} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="font-bold"
                onClick={() => void signIn("discord")}
                aria-label={t("header.signIn")}
              >
                <DiscordLogo
                  size={24}
                  weight="fill"
                  className="mr-2 text-[#5865F2]"
                />
                {t("header.signIn")}
              </Button>
            )}
            <Separator orientation="vertical" className="bg-muted h-8" />
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t("header.changeTheme")}
                >
                  {theme === "light" ? (
                    <Moon
                      weight="regular"
                      size={16}
                      className="text-violet-500"
                    />
                  ) : (
                    <Sun
                      weight="regular"
                      size={16}
                      className="text-yellow-500"
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t("header.light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t("header.dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  {t("header.system")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t("header.changeLanguage")}
                >
                  <Translate
                    weight="regular"
                    size={16}
                    className="text-blue-500"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("es")}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-50 flex flex-col gap-6 bg-background/80 px-4 py-2 backdrop-blur-sm lg:px-16 xl:hidden">
          <nav className="flex flex-col gap-4">
            {status === "authenticated" ? (
              <div className="flex flex-col gap-4">
                <ul>
                  <li className="flex items-center justify-between border-b-[1px] py-2">
                    <div>{sessionData.user?.name}</div>
                    <Avatar className="border">
                      <AvatarImage src={userImage} alt="User profile picture" />
                      <AvatarFallback>
                        {sessionData.user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </li>
                  <li className="border-b-[1px] py-3">
                    <Link
                      href={`/user/${sessionData.user?.name}`}
                      className="flex w-full items-center justify-between"
                    >
                      {t("header.profile")} <IdentificationCard size={24} />
                    </Link>
                  </li>
                  <li className="border-b-[1px] py-3">
                    <Link
                      href="/my-side-projects"
                      className="flex w-full items-center justify-between"
                    >
                      {t("header.mySideProjects")} <Folder size={24} />
                    </Link>
                  </li>
                  <li className="border-b-[1px] py-3">
                    <Link
                      href="/edit-profile"
                      className="flex w-full items-center justify-between"
                    >
                      {t("header.settings")} <Gear size={24} />
                    </Link>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="font-bold"
                  onClick={() => void signOut()}
                  aria-label={t("header.signOut")}
                >
                  <SignOut size={16} className="mr-2" />
                  {t("header.signOut")}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="font-bold"
                onClick={() => void signIn("discord")}
                aria-label={t("header.signIn")}
              >
                <DiscordLogo
                  size={24}
                  weight="fill"
                  className="mr-2 text-[#5865F2]"
                />
                {t("header.signIn")}
              </Button>
            )}
            <ul>
              <li className="flex items-center justify-between border-b-[1px] py-4 font-medium">
                <Link
                  href="/side-projects"
                  className={cn(
                    "transition-colors hover:text-primary",
                    pathname?.startsWith("/side-projects")
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {t("header.projects")}
                </Link>
              </li>
              <li className="flex items-center justify-between border-b-[1px] py-4 font-medium">
                <Link
                  href="/members"
                  className={cn(
                    "transition-colors hover:text-primary",
                    pathname?.startsWith("/members")
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {t("header.members")}
                </Link>
              </li>
              <li className="flex items-center justify-between border-b-[1px] py-2 font-medium">
                {t("header.theme")}
                <Select
                  defaultValue={theme}
                  onValueChange={(value: string) => setTheme(value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder={t("header.theme")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        {t("header.light")}
                        <Sun
                          weight="regular"
                          size={16}
                          className="text-yellow-500"
                        />
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        {t("header.dark")}
                        <Moon
                          weight="regular"
                          size={16}
                          className="text-violet-500"
                        />
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        {t("header.system")}
                        <Monitor weight="regular" size={16} />
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </li>
              <li className="flex items-center justify-between border-b-[1px] py-2 font-medium">
                {t("header.language")}
                <Select
                  defaultValue={lang}
                  onValueChange={(value: string) => changeLanguage(value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder={t("header.language")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
