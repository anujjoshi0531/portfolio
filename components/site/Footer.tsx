import { socialLinks } from "@/lib";
import { SocialIcon } from '@/components/global/Social';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center mt-6 pt-12 pb-8 flex flex-col items-center justify-center bg-muted gap-12">
      <div className="space-y-4">
        <p className="flex space-x-4 sm:text-lg md:text-xl justify-center">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <SocialIcon key={link.title} href={link.href} title={link.title}>
                <Icon />
              </SocialIcon>
            );
          })}
        </p>
        <p className="text-xs sm:text-sm text-center">
          All rights are reserved by&nbsp;
          <Link className="link hover:text-theme hover:font-semibold" href="/">
            Anuj Joshi
          </Link>
          &nbsp;&copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
