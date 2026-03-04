import { containerVariants } from '@/lib/animate';
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LinkPreview } from "@/components/animate/LinkPreview";
import { useEffect, useRef, useState } from "react";

interface PerkProps {
  value?: number;
  link?: string;
  title: string;
  icon?: IconType;
  subtitle?: string;
}

function useCounter(target: number | undefined) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 120 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView && target !== undefined) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [springValue]);

  return { ref, display };
}

function Perk({ value, link, title, icon: Icon, subtitle }: PerkProps) {
  const { ref, display } = useCounter(value);
  const perkText = `${value}+ ${title}`;

  const content = (
    <div className="p-4 text-center m-1 space-y-1 bg-muted/60 hover:bg-muted/80 rounded-md hover:scale-[1.02] transition-all duration-150 group">
      {Icon && (
        <Icon className="text-theme text-3xl md:text-4xl my-4 mx-auto group-hover:scale-110" />
      )}
      {subtitle && <Badge>{subtitle}</Badge>}
      <div className="font-semibold mt-1 text-md md:text-lg tracking-[0.05rem] leading-5 text-nowrap capitalize">
        <span ref={ref}>{value !== undefined ? display : ""}</span>
        {value !== undefined ? "+" : ""} {title}
      </div>
    </div>
  );

  if (link) {
    return (
      <LinkPreview title={title} url={link} aria-label={`View ${perkText}`}>
        {content}
      </LinkPreview>
    );
  }

  return (
    <Link href="#" target="_self" aria-label={perkText}>
      {content}
    </Link>
  );
}

function PerkSkeleton() {
  return (
    <div className="p-4 text-center m-1 space-y-1 bg-muted/50 rounded-md animate-pulse">
      <div className="my-2 mx-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted-foreground/20" />
      <div className="mx-auto w-16 h-4 rounded-sm bg-muted-foreground/20" />
      <div className="mt-1 mx-auto w-24 md:w-28 h-5 rounded-md bg-muted-foreground/20" />
    </div>
  );
}

function PerkAnimation({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}


export { Perk, PerkSkeleton, PerkAnimation };
