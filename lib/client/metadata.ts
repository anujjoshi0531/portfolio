type PageMetadata = {
    title: string;
    description: string;
};

export const pagesMetadata: Record<string, PageMetadata> = {
    about: {
        title: "About",
        description:
            "Learn about Anuj Joshi, a Computer Science Engineer from DTU specializing in full-stack development, AI/ML, Web3, and robotics. Explore my professional journey, technical expertise, and passion for building impactful digital solutions."
    },

    blog: {
        title: "Blogs",
        description:
            "Explore insightful articles, tutorials, and technical deep-dives on web development, AI/ML, Web3, and emerging technologies. Stay informed with well-researched explanations and practical development guidance."
    },

    project: {
        title: "Projects",
        description:
            "Discover my portfolio of innovative projects across full-stack development, AI/ML, Web3, and robotics. Browse detailed breakdowns, live demos, and real-world applications showcasing modern engineering and problem-solving."
    },

    contact: {
        title: "Contact",
        description:
            "Get in touch for collaborations, freelance opportunities, or technical discussions. Connect with me to explore web development, AI/ML, Web3, or robotics projects and build meaningful solutions together."
    },
};

export const getMetadata = (page: keyof typeof pagesMetadata): PageMetadata => {
    return pagesMetadata[page];
};
