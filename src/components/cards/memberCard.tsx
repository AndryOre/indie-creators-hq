import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components";

import { ArrowUpRight } from "@phosphor-icons/react";
import { type User } from "@prisma/client";
import { useTranslation } from "next-i18next";

type MemberCardProps = {
  user: Omit<User, "email" | "emailVerified" | "onBoardingComplete">;
};

export const MemberCard = ({ user }: MemberCardProps): JSX.Element => {
  const { t } = useTranslation("common");

  const [userImage, setUserImage] = useState("");
  const [hasHeadline, setHasHeadline] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.image?.includes("/embed/avatars/")) {
        setUserImage("");
      } else {
        setUserImage(user.image ?? "");
      }
      setHasHeadline(!!user.headline);
    }
  }, [user]);

  return (
    <Card className="w-72 hover:border-primary/50 transition-colors flex flex-col justify-between">
      <CardHeader className="flex items-center">
        <Avatar className="w-16 h-16 border">
          <AvatarImage src={userImage} />
          <AvatarFallback className="text-2xl">
            {user.name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{user.realName}</CardTitle>
        <CardDescription className="text-primary">{`@${user.name}`}</CardDescription>
        {hasHeadline && <div>{user.headline}</div>}
      </CardHeader>
      <CardFooter className="flex justify-center">
        {/* <Link href={`/members/${user.name}`} target="_self"> */}
        <Link
          href="/members/[username]"
          as={`/members/${user.name}`}
          target="_self"
        >
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            {t("members.viewProfile")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
