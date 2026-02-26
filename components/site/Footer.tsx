import { socialLinks } from "@/lib";
import { SocialIcon } from '@/components/global/Social';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center mt-6 py-8 space-y-4 flex flex-col items-center justify-center bg-muted">
      <p className="flex space-x-4 sm:text-lg md:text-xl">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <SocialIcon key={link.title} href={link.href} title={link.title}>
              <Icon />
            </SocialIcon>
          );
        })}
      </p>
      <p className="text-xs sm:text-sm">
        All rights are reserved by&nbsp;
        <Link className="link hover:text-theme hover:font-semibold" href="/" aria-label="Go to homepage">
          Anuj Joshi
        </Link>
        &nbsp;&copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
