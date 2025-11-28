import { CalendarArrowDown, CalendarArrowUp, ArrowUpAZ, ArrowDownZA } from "lucide-react";
import {
  FaGit,
  FaGithub,
  FaInstagram,
  FaJs,
  FaLinkedin,
  FaNodeJs,
  FaPython,
  FaReact,
  FaCode,
  FaTelegram,
} from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import {
  SiC,
  SiCplusplus,
  SiDjango,
  SiPytorch,
  SiExpress,
  SiTensorflow,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiPostgresql,
  SiOpencv,
  SiScikitlearn,
  SiKeras,
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiGeeksforgeeks,
} from "react-icons/si";

export const socialLinks = [
  {
    title: "GitHub",
    href: "https://github.com/Anujjoshi3105/",
    icon: <FaGithub />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/anujjoshi3105/",
    icon: <FaLinkedin />,
  },
  {
    title: "X (Twitter)",
    href: "https://x.com/anujjoshi3105",
    icon: <FaXTwitter />,
  },
  {
    title: "Telegram",
    href: "https://t.me/anujjoshi3105/",
    icon: <FaTelegram />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/anujjoshi3105/",
    icon: <FaInstagram />,
  },
];
export const skills = [
  {
    title: "Machine Learning",
    skill: [
      {
        name: "Pytorch",
        icon: <SiPytorch className="icon" />,
      },
      {
        name: "Scikit-learn",
        icon: <SiScikitlearn className="icon" />,
      },
      {
        name: "TensorFlow",
        icon: <SiTensorflow className="icon" />,
      },
      {
        name: "Keras",
        icon: <SiKeras className="icon" />,
      },
      {
        name: "Open CV",
        icon: <SiOpencv className="icon" />,
      },
    ],
  },
  {
    title: "Web Development",
    skill: [
      {
        name: "React",
        icon: <FaReact className="icon" />,
      },
      {
        name: "Node Js",
        icon: <FaNodeJs className="icon" />,
      },
      {
        name: "Express Js",
        icon: <SiExpress className="icon" />,
      },
      {
        name: "MongoDb",
        icon: <SiMongodb className="icon" />,
      },
      {
        name: "MySQL",
        icon: <SiMysql className="icon" />,
      },
      {
        name: "Postgre Sql",
        icon: <SiPostgresql className="icon" />,
      },
      {
        name: "Javascript",
        icon: <FaJs className="icon" />,
      },
      {
        name: "Django",
        icon: <SiDjango className="icon" />,
      },
      {
        name: "Flask",
        icon: <SiFlask className="icon" />,
      },
    ],
  },
  {
    title: "Other Skills",
    skill: [
      {
        name: "C",
        icon: <SiC className="icon" />,
      },
      {
        name: "C++",
        icon: <SiCplusplus className="icon" />,
      },
      {
        name: "Python",
        icon: <FaPython className="icon" />,
      },
      {
        name: "Git",
        icon: <FaGit className="icon" />,
      },
      {
        name: "Docker",
        icon: <SiDocker className="icon" />,
      },
    ],
  },
];
export const perkData = [
  {
    platform: "leetcode",
    icon: SiLeetcode,
    link: "https://leetcode.com/anujjoshi3105/",
    username: "anujjoshi3105",
    level: "Knight",
    rating: 1910,
  },
  {
    platform: "codeforces",
    icon: SiCodeforces,
    link: "https://codeforces.com/profile/anujjoshi3105",
    username: "anujjoshi3105",
    level: "Specialist",
    rating: 1400,
  },
  {
    platform: "codechef",
    icon: SiCodechef,
    link: "https://www.codechef.com/users/anujjoshi3105",
    username: "anujjoshi3105",
    level: "2 Star",
    rating: 1500,
  },
  {
    platform: "gfg",
    icon: SiGeeksforgeeks,
    link: "https://auth.geeksforgeeks.org/user/anujjoshi3105",
    username: "anujjoshi3105",
    level: "4 Star",
    rating: 1900,
  },
  {
    platform: "atcoder",
    icon: FaCode,
    link: "https://atcoder.jp/users/anujjoshi3105",
    username: "anujjoshi3105",
    level: "Green",
    rating: 900,
  },
];
export const socialLink = [
  {
    title: "LinkedIn",
    name: "@Anujjoshi3105",
    link: "https://www.linkedin.com/in/anujjoshi3105/",
    icon: FaLinkedinIn,
  },
  {
    title: "Twitter",
    name: "@Anujjoshi3105",
    link: "https://x.com/AnujJoshi3105/",
    icon: FaXTwitter,
  },
  {
    title: "Telegram",
    name: "@Anujjoshi3105",
    link: "https://t.me/anujjoshi3105/",
    icon: FaTelegram,
  },
];

export const sortOptions = [
  {
    label: "Recent Published",
    value: "published-descending",
    icon: CalendarArrowUp,
  },
  {
    label: "Oldest Published",
    value: "published-ascending",
    icon: CalendarArrowDown,
  },
  {
    label: "A-Z Title",
    value: "name-ascending",
    icon: ArrowUpAZ,
  },
  {
    label: "Z-A Title",
    value: "name-descending",
    icon: ArrowDownZA,
  },
  {
    label: "Recent Updated",
    value: "updated-descending",
    icon: CalendarArrowUp,
  },
  {
    label: "Oldest Updated",
    value: "updated-ascending",
    icon: CalendarArrowDown,
  },
]