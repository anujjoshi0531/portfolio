import { LinkPreview } from "../animate/LinkPreview";

interface HeroSocialProps {
  title: string;
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function HeroSocial({ title, name, href, icon: Icon }: HeroSocialProps) {
  return (
    <LinkPreview url={href} title={title} className="group md:flex items-center justify-center gap-2 hover:scale-105 transition-all duration-150 md:text-left text-center">
      {Icon && (
        <Icon className="text-theme text-2xl md:text-3xl group-hover:text-primary my-2 mx-auto" />
      )}
      <div className="items-center sm:block">
        <p className="font-bold text-sm md:text-md">{title}</p>
        <p className="text-xs">{name}</p>
      </div>
    </LinkPreview>
  );
}

interface SocialIconProps {
  href: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

function SocialIcon({ href, title, children }: SocialIconProps) {
  return (
    <button
      className="group relative isolate rounded-full p-2 transition-all shrink-0 before:absolute before:inset-px before:-z-10 before:rounded-full before:transition-all before:duration-500  hover:before:inset-full bg-background hover:bg-primary hover:text-background before:bg-background"
      aria-label={title}
      title={title}>
      <LinkPreview url={href} title={title}>
        {children}
      </LinkPreview>
    </button>
  );
}

interface SocialLinkProps {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}
function SocialLink({ title, href, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-2 items-center">
      {Icon && <Icon className="text-theme" />}
      <span className="link">{title}</span>
    </a>
  );
}
export { HeroSocial, SocialIcon, SocialLink };
