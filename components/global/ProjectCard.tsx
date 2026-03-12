import { Github, Globe } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { extractPlainText } from "@/lib";
import { LinkPreview } from "@/components/animate/LinkPreview";
import { cn } from "@/lib";

interface ProjectTag {
  id: string;
  name: string;
}

interface ProjectCardProps {
  project: NotionProjectPage;
  size?: boolean;
  index?: number;
  hovered?: number | null;
  setHovered?: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProjectCard = ({
  project,
  size = false,
  index = 0,
  hovered = null,
  setHovered,
}: ProjectCardProps) => {
  const tags = project?.properties?.Topics?.multi_select || [];
  const title = extractPlainText(project.properties.Name?.title || []) || "Untitled Project";
  const description = extractPlainText(project.properties.Description?.rich_text || []) || "No description available";
  const image = project.properties.Thumbnail?.url || '/icon.webp';
  const githubUrl = project.properties.GitHub?.url || "#";
  const liveUrl = project.properties.URL?.url || "#";
  const pid = extractPlainText(project.properties.pid?.rich_text || []) || "unknown";

  // FocusCard interaction: blur & scale down when a sibling is hovered
  const isOtherHovered = hovered !== null && hovered !== index;

  return (
    <figure
      className={cn(
        size ? "w-full" : "w-[450px]",
        "h-[450px] relative rounded-md overflow-hidden transition-all duration-300 ease-out outline-hidden",
        isOtherHovered && "blur-sm scale-[0.98]"
      )}
      onMouseEnter={() => setHovered?.(index)}
      onMouseLeave={() => setHovered?.(null)}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={`${title} thumbnail`}
        fill
        className="object-cover brightness-90"
        loading="lazy"
      />

      {/* FocusCard-style overlay — fades in on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 flex flex-col justify-end py-8 px-5 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Action links */}
        <div className="absolute top-4 left-4 flex gap-3">
          <LinkPreview
            title={title}
            url={githubUrl}
            className="text-xl text-white hover:text-theme hover:scale-110 transition-transform"
            ariaLabel={`View ${title} GitHub repository`}
          >
            <Github className="size-5" />
          </LinkPreview>
          <LinkPreview
            title={title}
            url={liveUrl}
            className="text-xl text-white hover:text-theme hover:scale-110 transition-transform"
            ariaLabel={`Visit ${title} live website`}
          >
            <Globe className="size-5" />
          </LinkPreview>
        </div>

        {/* Title — FocusCard gradient text style */}
        <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 capitalize mb-2">
          {title}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tech: ProjectTag) => (
            <Badge key={tech.id}>{tech.name}</Badge>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-300 line-clamp-3 mb-4 leading-5 md:leading-6">{description}</p>

        {/* CTA */}
        <Link href={`/blog/${pid}`} className="w-fit" aria-label={`Learn more about ${title}`}>
          <Button size="sm" className="w-fit">
            Learn More&nbsp;&gt;
          </Button>
        </Link>
      </div>

      {/* Always-visible bottom tags (visible when overlay is hidden) */}
      <figcaption
        className={cn(
          "absolute bottom-5 left-4 transition-opacity duration-300",
          hovered === index ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-wrap gap-2">
          {tags.map((tech: ProjectTag) => (
            <Badge key={`footer-${tech.id}`}>{tech.name}</Badge>
          ))}
        </div>
      </figcaption>
    </figure>
  );
};

export default memo(ProjectCard);
