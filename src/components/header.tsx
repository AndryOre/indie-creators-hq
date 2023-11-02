import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
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

import IndieCreatorsHQDark from "../../public/assets/Indie_Creatos_HQ_Logo_Dark.svg";
import IndieCreatorsHQLight from "../../public/assets/Indie_Creatos_HQ_Logo_Light.svg";

import {
  DiscordLogo,
  Gear,
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

export default function Header(): JSX.Element {
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    void router.push(router.pathname, router.pathname, { locale: lang });
    setLang(lang);
  };

  const { data: sessionData } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuBg = isMenuOpen ? "backdrop-blur-sm bg-background/80" : "";

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`flex w-full flex-col items-center justify-between px-4 py-3 xl:flex-row xl:px-40 ${menuBg}`}
      >
        <div className="flex w-full items-center justify-between xl:w-auto">
          <Link href="/">
            <Image
              src={IndieCreatorsHQLight as string}
              alt="Indie Creators HQ"
              className="h-12 w-auto dark:hidden lg:h-16"
            />
            <Image
              src={IndieCreatorsHQDark as string}
              alt="Indie Creators HQ"
              className="hidden h-12 w-auto dark:block lg:h-16"
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
        <nav className="hidden items-center gap-4 font-medium xl:flex">
          <div className="flex gap-4">
            <div>
              {sessionData ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="border-[1px]">
                      <AvatarImage
                        src={sessionData.user.image ?? ""}
                        alt="User profile picture"
                      />
                      <AvatarFallback>IC</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {sessionData.user?.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-muted-foreground">
                      <Link
                        href="/settings"
                        className="flex w-full items-center justify-between"
                      >
                        {t("header.settings")} <Gear size={16} />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex w-full items-center justify-between text-muted-foreground"
                      onClick={() => void signOut()}
                    >
                      {t("header.signOut")} <SignOut size={16} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
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
            </div>
            <Separator orientation="vertical" className="bg-primary" />
            <DropdownMenu>
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
            <DropdownMenu>
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
        </nav>
      </div>
      {isMenuOpen && (
        <div className="fixed left-0 top-[20] z-50 flex h-full w-full flex-col gap-6 bg-background/80 px-4 py-2 backdrop-blur-sm lg:px-16 xl:hidden">
          <nav className="flex flex-col gap-4">
            {sessionData ? (
              <div className="flex flex-col gap-4">
                <ul>
                  <li className="flex items-center justify-between border-b-[1px] py-2">
                    <div>{sessionData.user?.name}</div>
                    <Avatar className="border-[1px]">
                      <AvatarImage
                        src={sessionData.user.image ?? ""}
                        alt="User profile picture"
                      />
                      <AvatarFallback>IC</AvatarFallback>
                    </Avatar>
                  </li>
                  <li className="border-b-[1px] py-3">
                    <Link
                      href="/settings"
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
              <li className="flex items-center justify-between border-b-[1px] py-2">
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
              <li className="flex items-center justify-between border-b-[1px] py-2">
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
}
