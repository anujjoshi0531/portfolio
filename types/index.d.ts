/** A single Notion rich_text segment */
type NotionRichTextItem = {
    plain_text: string;
    text?: { content: string; link: { url: string } | null };
    annotations?: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    href?: string | null;
};

/** A single multi_select / select option */
type NotionSelectOption = {
    id: string;
    name: string;
    color?: string;
};

type RichText = {
    type: "text";
    text: {
        content: string;
        link: {
            url: string;
        } | null;
    };
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
};

type NotionPage = {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
        object: "user";
        id: string;
    };
    last_edited_by: {
        object: "user";
        id: string;
    };
    cover?: {
        type: "external";
        external: {
            url: string;
        };
    };
    icon?: {
        type: "emoji";
        emoji: string;
    };
    parent: {
        type: "database_id";
        database_id: string;
    };
    archived: boolean;
    in_trash: boolean;
    properties: {
        [key: string]: any;
        "Last Updated"?: {
            id: string;
            type: "last_edited_time";
            last_edited_time: string;
        };
        "Thumbnail"?: {
            id: string;
            type: "url";
            url: string | null;
        };
        "Github"?: {
            id: string;
            type: "url";
            url: string | null;
        };
        "Link"?: {
            id: string;
            type: "url";
            url: string | null;
        };
        "Public"?: {
            id: string;
            type: "checkbox";
            checkbox: boolean;
        };
        "Project"?: {
            id: string;
            type: "checkbox";
            checkbox: boolean;
        };
        "Tags"?: {
            id: string;
            type: "multi_select";
            multi_select: {
                id: string;
                name: string;
                color: string;
            }[];
        };
        "Slug"?: {
            id: string;
            type: "rich_text";
            rich_text: RichText[];
        };
        "Published"?: {
            id: string;
            type: "date";
            date: {
                start: string;
                end: string | null;
                time_zone: string | null;
            };
        };
        "Tweet"?: {
            id: string;
            type: "rich_text";
            rich_text: RichText[];
        };
        "Created"?: {
            id: string;
            type: "created_time";
            created_time: string;
        };
        "Author"?: {
            id: string;
            type: "rich_text";
            rich_text: RichText[];
        };
        "Description"?: {
            id: string;
            type: "rich_text";
            rich_text: RichText[];
        };
        "Name"?: {
            id: string;
            type: "title";
            title: RichText[];
        };
    };
    url: string;
    public_url?: string;
};

type NotionPageList = {
    object: "list";
    results: NotionPage[];
};

type NotionBlogPage = {
    id: string;
    created_time: string;
    last_edited_time: string;
    cover?: { type: "external" | "file"; external?: { url: string }; file?: { url: string } } | null;
    properties: {
        Name: { title: NotionRichTextItem[] };
        Description: { rich_text: NotionRichTextItem[] };
        Slug: { rich_text: NotionRichTextItem[] };
        Author: { rich_text: NotionRichTextItem[] };
        Tags: { multi_select: NotionSelectOption[] };
        Published: { date: { start: string; end: string | null; time_zone: string | null } | null };
        Thumbnail: { url?: string | null; files?: { file?: { url: string }; external?: { url: string } }[] };
        Public: { checkbox: boolean };
    };
    url: string;
    public_url?: string | null;
};

type NotionProjectPage = {
    id: string;
    created_time: string;
    last_edited_time: string;
    cover?: { type: "external" | "file"; external?: { url: string }; file?: { url: string } } | null;
    properties: {
        Name: { title: NotionRichTextItem[] };
        Description: { rich_text: NotionRichTextItem[] };
        pid: { rich_text: NotionRichTextItem[] };
        Topics: { multi_select: NotionSelectOption[] };
        Thumbnail: { url?: string | null; files?: { file?: { url: string }; external?: { url: string } }[] };
        GitHub: { url: string | null };
        URL: { url: string | null };
        Category: { select: NotionSelectOption | null };
        Project: { checkbox: boolean };
        Public: { checkbox: boolean };
    };
    url: string;
};

type NotionProjectType = {
    id: string;
    name: string;
    color?: string;
};

type NotionTestimonialPage = {
    id: string;
    properties: {
        Name: { rich_text: NotionRichTextItem[] };
        Company: { rich_text: NotionRichTextItem[] };
        Position: { rich_text: NotionRichTextItem[] };
        Rating: { select: { name: string } | null };
        Platform: { select: { name: string } | null };
        Project: { rich_text: NotionRichTextItem[] };
        Contact: { rich_text: NotionRichTextItem[] };
        Avatar: { files: { file?: { url: string }; external?: { url: string } }[] };
        Remark: { title: NotionRichTextItem[] };
        Date: { date: { start: string } | null };
    };
};

type NotionExperience = {
    id: string
    properties: {
        Role: { title: { plain_text: string }[] }
        Type: { select: { name: string } | null }
        Organization: { rich_text: { plain_text: string }[] }
        Description: { rich_text: { plain_text: string }[] }
        Start: { date: { start: string } }
        End: { date: { start: string | null } }
        Place: { rich_text: { plain_text: string }[] }
        URL: { url: string | null }
        Certificate: { url: string | null }
        Skills: { multi_select: { name: string }[] }
    }
}

type SocialLinkEntry = {
    title: string;
    name: string;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

type Rating = {
    username: string;
    rating: number;
    level: string;
};

declare module 'prismjs/components/*' {
    const content: any;
    export default content;
}
