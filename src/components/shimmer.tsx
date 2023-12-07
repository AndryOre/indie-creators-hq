import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ShineEffectProps {
  className?: string;
  children: ReactNode;
}

export const Shimmer = ({
  className,
  children,
}: ShineEffectProps): JSX.Element => {
  const shimmerClass = cn(
    "absolute top-0 bottom-0 left-0 right-0 -z-1 shimmer",
    className,
  );

  return (
    <div className="relative inline-flex w-fit">
      {children}
      <div className={shimmerClass} />
    </div>
  );
};
