import { containerVariants } from "@/components/animate/animate";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PerkProps {
  value?: string | number;
  link?: string;
  title: string;
  icon?: IconType;
  subtitle?: string;
}

function Perk({ value, link, title, icon: Icon, subtitle }: PerkProps) {
  const perkText = `${value}+ ${title}`;
  return (
    <Link href={link || "#"} target={link ? "_blank" : "_self"} aria-label={link ? `View ${perkText}` : perkText}>
      <div className="p-4 text-center m-1 space-y-1 bg-muted/60 hover:bg-muted/80 rounded-md hover:scale-[1.02] transition-all duration-150 group">
        {Icon && (
          <Icon className="text-theme text-3xl md:text-4xl my-4 mx-auto group-hover:scale-110" />
        )}
        {subtitle && <Badge>{subtitle}</Badge>}
        <div className="font-semibold mt-1 text-md md:text-lg tracking-[0.05rem] leading-5 text-nowrap capitalize">
          {value}+ {title}
        </div>
      </div>
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


export {Perk, PerkSkeleton, PerkAnimation};
