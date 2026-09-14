type BlogPost = {
    id: string;
    slug: string;
    title: string;
    description: string;
    author?: string;
    category?: string;
    tags: string[];
    thumbnail?: string;
    published?: string;
    created?: string;
    updated?: string;
    likes: number;
    views: number;
    content: string;
};

type Project = {
    id: string;
    slug: string;
    title: string;
    description: string;
    category?: string;
    status?: string;
    start?: string;
    end?: string;
    tags: string[];
    skills: string[];
    thumbnail?: string;
    github?: string;
    url?: string;
    likes: number;
    views: number;
    content: string;
};

type ProjectCategory = {
    id: string;
    name: string;
};

type SocialLinkEntry = {
    title: string;
    name: string;
    href: string;
    icon: React.ComponentType<any>;
};

type PerkRating = {
    rating: number;
    level: string;
};

type Experience = {
    company: string;
    role: string;
    start: Date | string;
    end: Date | string;
    place: string;
    description: string[];
    skills: string[];
    link: string;
};

type Testimonial = {
    review: string;
    name: string;
    role: string;
    avatar: string;
    contact?: string;
};

type Skill = {
    name: string;
    icon: JSX.Element;
};

type Education = {
    id: string;
    course: string;
    institution: string;
    place?: string;
    grade?: string;
    description?: string[];
    start: string;
    end: string;
    skills?: string[];
    type?: string;
    url?: string;
};
