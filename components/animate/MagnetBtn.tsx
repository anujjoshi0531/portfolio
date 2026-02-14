"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib";
import { ReactNode, useRef, useState } from "react";

type MagnetBtnProps = {
  text: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
  className?: string;
};

const sizeClasses = {
  xs: "w-14 h-14",
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

export function MagnetBtn({ text, size = "md", children, className }: MagnetBtnProps) {
  const currentSize = sizeClasses[size];
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);

      setPosition({ x: middleX, y: middleY });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "group cursor-pointer hover:scale-105 ring-1 ring-primary relative flex items-center justify-center bg-primary text-background hover:bg-muted hover:text-primary rounded-full transition-all",
        currentSize
      )}>
      <div
        className={cn(
          "transition-transform group-hover:rotate-12",
          {
            xs: "text-lg",
            sm: "text-xl",
            md: "text-3xl",
            lg: "text-4xl",
            xl: "text-5xl",
          }[size]
        )}>
        {children}
      </div>
      <svg
        className="absolute w-full h-full -rotate-90 animate-spin-slow"
        viewBox="0 0 100 100">
        <path
          id="circlePath"
          d="M50,50m-40,0a40,40 0 1,1 80,0a40,40 0 1,1 -80,0"
          fill="none"
        />
        <text
          className={cn("text-[10px] font-semibold uppercase fill-current", className)}>
          <textPath href="#circlePath" xlinkHref="#circlePath">
            {text}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
}
