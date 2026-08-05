"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ClippedCircle } from "@/components/unlumen-ui/primitives/clipped-circle";
import { Tilt, type TiltProps } from "@/components/unlumen-ui/primitives/tilt";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  /** left half of the split badge pill; shown as a simple pill if `badgeLabel` is omitted */
  price?: string;
  /** right half of the split pill, coloured by `badgeVariant` */
  badgeLabel?: string;
  badgeVariant?: "success" | "warning";
  imageSrc?: string;
  imageAlt?: string;
  /** wraps the card in a plain `<a>` tag */
  href?: string;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

const BADGE_LABEL_CLASSES: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
};

export function TiltCard({
  title,
  description,
  price,
  badgeLabel,
  badgeVariant = "success",
  imageSrc,
  imageAlt = "",
  href,
  children,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl",
        "flex flex-col gap-4",
        "min-h-48 sm:min-h-52 md:min-h-56 h-auto w-full max-w-sm",
        "hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300 ease-out",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row transition-all duration-200 justify-between px-4 sm:px-6 py-4 sm:py-5 z-20 relative gap-4">
        <div className="flex flex-col gap-1 flex-1 mr-2">
          <h2 className="text-xl tracking-tight leading-tight font-outfit font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {price && badgeLabel ? (
          <div className="inline-flex h-fit items-center text-sm whitespace-nowrap shrink-0 border border-black/10 dark:border-white/10 rounded-full overflow-hidden">
            <span className="bg-black/5 dark:bg-white/10 text-slate-800 dark:text-white py-1 px-3 font-medium">
              {price}
            </span>
            <span
              className={cn(
                "py-1 px-3 font-medium",
                BADGE_LABEL_CLASSES[badgeVariant],
              )}
            >
              {badgeLabel}
            </span>
          </div>
        ) : price ? (
          <span className="h-fit rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white px-3 py-1 text-sm font-medium whitespace-nowrap shrink-0">
            {price}
          </span>
        ) : null}
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className={cn(
            "absolute z-10 -bottom-10 -right-6 w-56 rounded-md opacity-80",
            "rotate-[-5deg] border-black/10 dark:border-white/10 border shadow-2xl",
            "transition-all duration-500 ease-out",
            "group-hover:-rotate-3 group-hover:-translate-y-2 group-hover:-translate-x-1 group-hover:scale-110",
          )}
        />
      )}

      <ClippedCircle circleClassName="bg-blue-500" circleSize={400} />
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return <div {...props}>{inner}</div>;
}
