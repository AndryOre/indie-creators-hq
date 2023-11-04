import React, { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export enum CarouselSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

const CarouselSizes: Record<CarouselSize, string> = {
  [CarouselSize.sm]: "h-auto w-1/2",
  [CarouselSize.md]: "h-auto w-3/4",
  [CarouselSize.lg]: "h-auto w-full",
  [CarouselSize.xl]: "h-auto w-screen",
};

interface CarouselProps {
  children: ReactNode[];
  size?: CarouselSize;
  className?: string;
}

export function Carousel({
  children,
  size = CarouselSize.xl,
  className,
}: CarouselProps): JSX.Element {
  const [startIndex, setStartIndex] = useState<number>(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % children.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  const displayedItems = [...children.slice(startIndex), ...children].slice(
    0,
    children.length,
  );
  const carouselClasses = cn(
    className,
    "relative bg-transparent",
    CarouselSizes[size],
  );

  return (
    <div className={carouselClasses}>
      <div className="flex justify-center gap-8 overflow-x-clip px-4">
        {displayedItems}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-full bg-muted-foreground p-1 font-bold text-white opacity-50 hover:opacity-100 dark:bg-muted"
      >
        <CaretLeft weight="bold" className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-full bg-muted-foreground p-1 font-bold text-white opacity-50 hover:opacity-100 dark:bg-muted"
      >
        <CaretRight weight="bold" className="h-5 w-5" />
      </button>
    </div>
  );
}
