import React, { useState, type ReactNode } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CarouselProps {
  children: ReactNode[];
}

export default function Carousel({ children }: CarouselProps): JSX.Element {
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

  return (
    <div className="relative h-auto w-screen bg-transparent">
      <div className="flex justify-center gap-8 overflow-x-clip px-4">
        {displayedItems}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-full bg-muted-foreground p-1 font-bold text-white opacity-50 hover:opacity-100 dark:bg-muted"
      >
        <CaretLeft weight="bold" className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-full bg-muted-foreground p-1 font-bold text-white opacity-50 hover:opacity-100 dark:bg-muted"
      >
        <CaretRight weight="bold" className="h-5 w-5" />
      </button>
    </div>
  );
}
