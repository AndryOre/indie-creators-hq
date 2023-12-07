import { type RefObject, type SVGProps, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { useInView } from "react-intersection-observer";

interface LaunchBoostImgProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const LaunchBoostImg = ({ className }: LaunchBoostImgProps) => {
  const svgClass = cn("will-change-transform w-full h-full", className);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const bar1Ref: RefObject<SVGRectElement> = useRef(null);
  const bar2Ref: RefObject<SVGRectElement> = useRef(null);
  const bar3Ref: RefObject<SVGRectElement> = useRef(null);
  const curvedLineRef: RefObject<SVGPathElement> = useRef(null);
  const dotRef: RefObject<SVGPathElement> = useRef(null);

  const refs = [
    { ref: bar1Ref, className: "barGrowing" },
    { ref: bar2Ref, className: "barGrowing2" },
    { ref: bar3Ref, className: "barGrowing3" },
    { ref: curvedLineRef, className: "curvedLine" },
    { ref: dotRef, className: "dot" },
  ];

  useEffect(() => {
    refs.forEach(({ ref, className }) => {
      ref?.current?.classList.toggle(className, inView);
    });
  }, [inView]);

  return (
    <svg
      className={svgClass}
      viewBox="0 0 1280 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <g id="Launch Boost-Dark">
        <g id="Rocket">
          <rect
            x="455.909"
            y="156.132"
            width="527.804"
            height="528.245"
            rx="16"
            className="fill-[#f5f5f5] dark:fill-[#171717] drop-shadow-lg"
          />
          <g id="Rocket_2" className="rocket">
            <g id="Flame">
              <path
                id="Background"
                d="M647.39 550.918L592.753 496.282C586.76 497.892 537.576 512.134 529.732 547.596C529.732 547.596 554.558 540.676 568.257 542.966C568.257 542.966 526.263 604.144 534.656 617.497C543.048 630.851 607.68 565.552 607.68 565.552C607.68 565.552 600.269 593.521 609.228 597.997C609.261 598.014 609.299 598.021 609.335 598.032C612.973 599.191 634.164 582.584 641.118 570.194C645.74 561.959 647.036 554.803 647.39 550.918Z"
                className="dark:fill-[#EA580C] fill-[#FB923C]"
              />
              <path
                id="Border"
                d="M647.39 550.918L592.753 496.282C586.76 497.892 537.576 512.134 529.732 547.596C529.732 547.596 554.558 540.676 568.257 542.966C568.257 542.966 526.263 604.144 534.656 617.497C543.048 630.851 607.68 565.552 607.68 565.552C607.68 565.552 600.269 593.521 609.228 597.997C609.261 598.014 609.299 598.021 609.335 598.032C612.973 599.191 634.164 582.584 641.118 570.194C645.74 561.959 647.036 554.803 647.39 550.918Z"
                className="stroke-black stroke-2"
              />
              <path
                id="Shade"
                d="M636.915 531.372L610.547 505.005C607.167 506.272 579.351 517.221 572.781 537.119C572.781 537.119 586.804 531.74 594.148 532.112C594.148 532.112 567.25 568.27 570.981 575.033C574.712 581.796 615.32 539.337 615.32 539.337C615.32 539.337 616.117 551.372 612.034 556.938C611.328 557.901 611.837 559.312 613.017 559.574C613.036 559.578 613.055 559.584 613.074 559.587C614.989 559.988 627.646 549.542 632.246 542.319C635.303 537.518 636.472 533.522 636.915 531.372Z"
                className="fill-white"
              />
            </g>
            <g id="Right Wing">
              <path
                id="Background_2"
                d="M715.513 611.118C711.79 614.134 706.333 613.814 702.878 610.359C700.344 607.825 699.416 604.1 700.501 600.743C706.633 581.877 711.688 557.295 707.855 533.488L773.534 474.175L793.495 511.831C797.073 523.585 794.359 536.253 786.353 545.362C773.047 560.544 750.598 582.729 715.513 611.118Z"
                className="fill-[#6066AF] dark:fill-[#FBFF00]"
              />
              <path
                id="Border_2"
                d="M715.513 611.118C711.79 614.134 706.333 613.814 702.878 610.359C700.344 607.825 699.416 604.1 700.501 600.743C706.633 581.877 711.688 557.295 707.855 533.488L773.534 474.175L793.495 511.831C797.073 523.585 794.359 536.253 786.353 545.362C773.047 560.544 750.598 582.729 715.513 611.118Z"
                className="stroke-black stroke-2"
              />
            </g>
            <g id="Left Wing">
              <path
                id="Background_3"
                d="M528.73 424.335C525.714 428.058 526.033 433.514 529.487 436.968C532.021 439.502 535.747 440.432 539.105 439.347C557.97 433.215 582.553 428.16 606.359 431.993L665.671 366.312L628.017 346.353C616.263 342.775 603.594 345.489 594.486 353.495C579.304 366.801 557.119 389.25 528.73 424.335Z"
                className="fill-[#6066AF] dark:fill-[#FBFF00]"
              />
              <path
                id="Border_3"
                d="M528.73 424.335C525.714 428.058 526.033 433.514 529.487 436.968C532.021 439.502 535.747 440.432 539.105 439.347C557.97 433.215 582.553 428.16 606.359 431.993L665.671 366.312L628.017 346.353C616.263 342.775 603.594 345.489 594.486 353.495C579.304 366.801 557.119 389.25 528.73 424.335Z"
                className="stroke-black stroke-2"
              />
            </g>
            <g id="Booster">
              <path
                id="Background_4"
                d="M665.456 572.937L567.173 474.654L598.479 463.359L676.751 541.631L665.456 572.937Z"
                className="fill-[#6066AF] dark:fill-[#FBFF00]"
              />
              <path
                id="Border_4"
                d="M665.456 572.937L567.173 474.654L598.479 463.359L676.751 541.631L665.456 572.937Z"
                className="stroke-black stroke-2"
              />
            </g>
            <g id="Body">
              <path
                id="Background_5"
                d="M807.69 476.277C773.746 510.221 728.772 533.135 676.487 541.364L598.484 463.36C613.862 365.519 685.106 288.944 779.296 266.572C803.376 260.847 832.151 255.916 859.408 257.107C872.214 257.678 882.617 268.116 883.18 280.913C884.37 308.154 879.009 336.48 873.276 360.552C862.854 404.4 837.262 446.705 807.69 476.277Z"
                className="fill-white"
              />
              <path
                id="Border_5"
                d="M807.69 476.277C773.746 510.221 728.772 533.135 676.487 541.364L598.484 463.36C613.862 365.519 685.106 288.944 779.296 266.572C803.376 260.847 832.151 255.916 859.408 257.107C872.214 257.678 882.617 268.116 883.18 280.913C884.37 308.154 879.009 336.48 873.276 360.552C862.854 404.4 837.262 446.705 807.69 476.277Z"
                className="stroke-black stroke-2"
              />
            </g>
            <g id="Window">
              <path
                id="Background_6"
                d="M801.096 414.854C780.455 435.495 746.684 435.191 725.67 414.177C704.655 393.162 704.353 359.392 724.994 338.751C745.635 318.11 779.404 318.412 800.419 339.427C821.434 360.442 821.737 394.213 801.096 414.854Z"
                className="fill-[#FD877D] dark:fill-[#FF6154]"
              />
              <path
                id="Border_6"
                d="M801.096 414.854C780.455 435.495 746.684 435.191 725.67 414.177C704.655 393.162 704.353 359.392 724.994 338.751C745.635 318.11 779.404 318.412 800.419 339.427C821.434 360.442 821.737 394.213 801.096 414.854Z"
                className="stroke-black stroke-2"
              />
              <path
                id="Reflection"
                d="M782.02 395.778C771.727 406.071 754.886 405.92 744.406 395.44C733.927 384.96 733.777 368.121 744.07 357.828C754.363 347.535 771.202 347.684 781.682 358.164C792.162 368.644 792.313 385.485 782.02 395.778Z"
                className="fill-white"
              />
            </g>
            <path
              id="Top"
              d="M873.276 360.552C854.36 316.931 822.986 285.651 779.296 266.572C803.376 260.847 832.151 255.916 859.408 257.107C872.214 257.678 882.617 268.116 883.18 280.913C884.37 308.154 879.009 336.48 873.276 360.552Z"
              fill="#FBFF00"
              className="fill-[#6066AF] dark:fill-[#FBFF00]"
            />
          </g>
        </g>
        <g id="Stats">
          <rect
            x="297"
            y="35"
            width="279"
            height="260.97"
            rx="16"
            className="fill-[#fafafa] dark:fill-[#262626] drop-shadow-lg"
          />
          <g id="Graph">
            <g id="Bars">
              <rect
                id="Bar"
                x="-378"
                y="-259.97"
                width="45"
                height="0"
                rx="8"
                className="fill-[#FF6154]"
                ref={bar1Ref}
              />
              <rect
                id="Bar_2"
                x="-459"
                y="-259.97"
                width="45"
                height="0"
                rx="8"
                className="fill-[#FD877D]"
                ref={bar2Ref}
              />
              <rect
                id="Bar_3"
                x="-540"
                y="-259.97"
                width="45"
                height="0"
                rx="8"
                className="fill-[#FF6154]"
                ref={bar3Ref}
              />
            </g>
            <g id="Line">
              <path
                id="Dot"
                d="M529.862 96.8671C529.862 103.381 524.581 108.662 518.067 108.662C511.553 108.662 506.272 103.381 506.272 96.8671C506.272 90.3531 511.553 85.0722 518.067 85.0722C524.581 85.0722 529.862 90.3531 529.862 96.8671Z"
                className="fill-black dark:fill-white"
                ref={dotRef}
              />
              <path
                id="Curved Line"
                d="M344 145.684C347.695 129.766 351.498 113.572 359.774 99.482C368.05 85.3921 381.649 73.4772 397.849 71.3488C411.35 69.5759 424.967 74.7591 436.24 82.3973C447.513 90.0354 456.928 100.044 466.852 109.368C474.739 116.778 484.641 124.28 495.277 122.281C506.947 120.088 513.355 107.767 518.067 96.8671"
                className="stroke-black stroke-2 dark:stroke-white"
                ref={curvedLineRef}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
