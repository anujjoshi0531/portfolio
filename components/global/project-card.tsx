import { FaGithub, FaGlobe } from "react-icons/fa";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";
import { extractPlainText } from "@/lib";

interface ProjectTag {
  id: string;
  name: string;
}

interface ProjectCardProps {
  project: any;
  size?: boolean;
}

const ProjectCard = ({ project, size = false }: ProjectCardProps) => {
  const tags = project?.properties?.Topics?.multi_select || [];
  const title = extractPlainText(project.properties.Name?.title || []) || "Untitled Project";
  const description = extractPlainText(project.properties.Description?.rich_text || []) || "No description available";
  const image = project.properties.Thumbnail?.url || '/icon.webp';
  const githubUrl = project.properties.GitHub?.url || "#";
  const liveUrl = project.properties.URL?.url || "#";
  const pid = extractPlainText(project.properties.pid?.rich_text || []) || "unknown";
  
  return (
    <figure className={`${size ? "w-full" : "w-[450px]"} h-[450px] relative photo transition-all rounded-md outline-hidden`}>
      <div className="w-full h-full bottom-photo absolute bg-muted flex flex-col justify-center px-5 leading-5 md:leading-6">
        <Link
          href={githubUrl}
          className="absolute top-4 left-4 text-xl hover:text-theme hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} GitHub repository`}
        >
          <FaGithub />
        </Link>
        <Link
          href={liveUrl}
          className="absolute top-4 right-4 text-xl hover:text-theme hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title} live website`}
        >
          <FaGlobe />
        </Link>
        <p className="md:text-xl sm:text-lg capitalize font-semibold">{title}</p>
        <div className="flex flex-wrap gap-2 my-2">
          {tags.map((tech: ProjectTag) => (
            <Badge key={tech.id}>{tech.name}</Badge>
          ))}
        </div>
        <p className="my-4 text-sm line-clamp-6">{description}</p>
        <Link href={`/blog/${pid}`} className="w-fit" aria-label={`Learn more about ${title}`}>
          <Button size="sm" className="w-fit">
            Learn More&nbsp;&gt;
          </Button>
        </Link>
      </div>
      <div className="w-full h-full object-cover brightness-90 absolute">
        <Image
          src={image}
          alt={`${title} thumbnail`}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      <figcaption className="absolute bottom-5 left-4 fig">
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
