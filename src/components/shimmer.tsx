import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

interface ShineEffectProps {
  className?: string;
  children: ReactNode;
}

export const Shimmer = ({
  className,
  children,
}: ShineEffectProps): JSX.Element => {
  const shimmerClass = cn(
    "absolute top-0 bottom-0 left-0 right-0 -z-1",
    className,
  );

  return (
    <div className="relative inline-flex w-fit">
      {children}
      <motion.div
        initial={{
          backgroundPosition: "200%",
        }}
        animate={{
          backgroundPosition: "-200%",
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            repeatDelay: 2,
          },
        }}
        className={shimmerClass}
        style={{
          backgroundImage:
            "linear-gradient(-30deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
};
