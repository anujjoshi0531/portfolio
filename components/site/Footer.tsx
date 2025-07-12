import { socialLinks } from "@/lib/data";
import { SocialIcon } from "@/components/global/social";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center mt-6 py-8 space-y-4 flex flex-col items-center justify-center bg-muted">
      <p className="flex space-x-4 sm:text-lg md:text-xl">
        {socialLinks.map((link, index) => (
          <SocialIcon key={index} href={link.href} title={link.title}>
            {link.icon}
          </SocialIcon>
        ))}
      </p>
      <p className="text-xs sm:text-sm">
        All rights are reserved by&nbsp;
        <Link className="link hover:text-theme hover:font-semibold" href="/">
          Anuj Joshi
        </Link>
        &nbsp;&copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
