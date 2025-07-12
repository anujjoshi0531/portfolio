import { IconType } from "react-icons";

interface HeroSocialProps {
  title: string;
  name: string;
  href: string;
  icon?: IconType;
}

function HeroSocial({ title, name, href, icon: Icon }: HeroSocialProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group md:flex items-center justify-center gap-2 hover:scale-105 transition-all duration-150 md:text-left text-center">
      {Icon && (
        <Icon className="text-theme text-2xl md:text-3xl group-hover:text-primary my-2 mx-auto" />
      )}
      <div className="items-center sm:block">
        <p className="font-bold text-sm md:text-md">{title}</p>
        <p className="text-xs">{name}</p>
      </div>
    </a>
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
    <a
      className="group relative isolate rounded-full p-2 transition-all shrink-0 before:absolute before:inset-px before:-z-10 before:rounded-full before:transition-all before:duration-500  hover:before:inset-full bg-background hover:bg-primary hover:text-background before:bg-background"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}>
      {children}
    </a>
  );
}

interface SocialLinkProps {
  title: string;
  href: string;
  icon?: IconType;
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
