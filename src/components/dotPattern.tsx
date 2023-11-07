import { cn } from "@/lib/utils";

export enum DottedBgSize {
  xs = "xs",
  sm = "sm",
  base = "base",
  lg = "lg",
  xl = "xl",
  "2xl" = "2xl",
  "3xl" = "3xl",
  "4xl" = "4xl",
}

const DotsSizes: Record<DottedBgSize, string> = {
  [DottedBgSize.xs]: "0.03125rem",
  [DottedBgSize.sm]: "0.0625rem",
  [DottedBgSize.base]: "0.09375rem",
  [DottedBgSize.lg]: "0.125rem",
  [DottedBgSize.xl]: "0.15625rem",
  [DottedBgSize["2xl"]]: "0.1875rem",
  [DottedBgSize["3xl"]]: "0.21875rem",
  [DottedBgSize["4xl"]]: "0.25rem",
};

const DotsSeparations: Record<DottedBgSize, string> = {
  [DottedBgSize.xs]: "0.3125rem 0.3125rem",
  [DottedBgSize.sm]: "0.625rem 0.625rem",
  [DottedBgSize.base]: "0.9375rem 0.9375rem",
  [DottedBgSize.lg]: "1.25rem 1.25rem",
  [DottedBgSize.xl]: "1.5625rem 1.5625rem",
  [DottedBgSize["2xl"]]: "1.875rem 1.875rem",
  [DottedBgSize["3xl"]]: "2.1875rem 2.1875rem",
  [DottedBgSize["4xl"]]: "2.5rem 2.5rem",
};

export enum DottedBgMaskDirection {
  leftToRight = "leftToRight",
  rightToLeft = "rightToLeft",
  topToBottom = "topToBottom",
  bottomToTop = "bottomToTop",
  topLeftToBottomRight = "topLeftToBottomRight",
  bottomRightToTopLeft = "bottomRightToTopLeft",
  topRightToBottomLeft = "topRightToBottomLeft",
  bottomLeftToTopRight = "bottomLeftToTopRight",
}

const MaskDirections: Record<DottedBgMaskDirection, string> = {
  [DottedBgMaskDirection.leftToRight]: "90deg",
  [DottedBgMaskDirection.rightToLeft]: "270deg",
  [DottedBgMaskDirection.topToBottom]: "180deg",
  [DottedBgMaskDirection.bottomToTop]: "0deg",
  [DottedBgMaskDirection.topLeftToBottomRight]: "135deg",
  [DottedBgMaskDirection.bottomRightToTopLeft]: "-45deg",
  [DottedBgMaskDirection.topRightToBottomLeft]: "-135deg",
  [DottedBgMaskDirection.bottomLeftToTopRight]: "45deg",
};

interface DottedPatternProps {
  className?: string;
  dotsSize?: DottedBgSize;
  dotsColors?: string;
  dotsSeparation?: DottedBgSize;
  isLinear?: boolean;
  maskDirection?: DottedBgMaskDirection;
  maskTransparency?: number;
}

export const DottedPattern = ({
  className,
  dotsSize = DottedBgSize.base,
  dotsColors = "from-gray-700",
  dotsSeparation = DottedBgSize.base,
  isLinear = false,
  maskDirection = DottedBgMaskDirection.topToBottom,
  maskTransparency = 80,
}: DottedPatternProps) => {
  const classes = cn(
    className,
    "dotted-background bg-repeat",
    "absolute inset-0 z-0",
    "h-full w-full ",
    dotsColors,
  );

  const cssCustomProps: Record<string, string> = {
    "--dots-size": `${DotsSizes[dotsSize]}`,
    "--dots-separation": DotsSeparations[dotsSeparation],
    "--mask-transparency": `${maskTransparency}%`,
    "--position": MaskDirections[maskDirection],
    "--mask-image": isLinear
      ? "linear-gradient(var(--position), rgb(0, 0, 0), transparent var(--mask-transparency))"
      : "radial-gradient(rgb(0, 0, 0), transparent var(--mask-transparency))",
  };

  return <div className={classes} style={cssCustomProps} />;
};
