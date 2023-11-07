import { cn } from "@/lib/utils";

export enum SpinnerSize {
  xs = "xs",
  sm = "sm",
  base = "base",
  lg = "lg",
  xl = "xl",
  "2xl" = "2xl",
  "3xl" = "3xl",
  "4xl" = "4xl",
}

const SpinnerSizes: Record<SpinnerSize, string> = {
  [SpinnerSize.xs]: "h-2 w-2",
  [SpinnerSize.sm]: "h-4 w-4",
  [SpinnerSize.base]: "h-5 w-5",
  [SpinnerSize.lg]: "h-8 w-8",
  [SpinnerSize.xl]: "h-10 w-10",
  [SpinnerSize["2xl"]]: "h-12 w-12",
  [SpinnerSize["3xl"]]: "h-16 w-16",
  [SpinnerSize["4xl"]]: "h-20 w-20",
};

interface SpinnerProps {
  className?: string;
  size?: SpinnerSize;
  color?: string;
}

export const Spinner = ({
  className,
  size = SpinnerSize.base,
  color = "text-foreground",
}: SpinnerProps): JSX.Element => {
  const svgClass = cn("animate-spin", SpinnerSizes[size], color, className);

  return (
    <svg
      className={svgClass}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
