/**
 * Strongly-typed ambient models for every Notion database used in this portfolio.
 * This file is intentionally free of imports so it is treated as a global
 * declaration file (analogous to experience.d.ts and notion.d.ts).
 * Import these wherever you previously used `any` for Notion data.
 */

// ---------------------------------------------------------------------------
// Shared building blocks (also used in notion.d.ts — kept separate for clarity)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Blog database page
// ---------------------------------------------------------------------------
type NotionBlogPage = {
    id: string;
    created_time: string;
    last_edited_time: string;
    cover?: { type: "external"; external: { url: string } } | null;
    properties: {
        Name: { title: NotionRichTextItem[] };
        Description: { rich_text: NotionRichTextItem[] };
        Slug: { rich_text: NotionRichTextItem[] };
        Author: { rich_text: NotionRichTextItem[] };
        Tags: { multi_select: NotionSelectOption[] };
        Published: { date: { start: string; end: string | null; time_zone: string | null } | null };
        Thumbnail: { url: string | null };
        Public: { checkbox: boolean };
    };
    url: string;
    public_url?: string | null;
};

// ---------------------------------------------------------------------------
// Project database page
// ---------------------------------------------------------------------------
type NotionProjectPage = {
    id: string;
    created_time: string;
    last_edited_time: string;
    cover?: { type: "external"; external: { url: string } } | null;
    properties: {
        Name: { title: NotionRichTextItem[] };
        Description: { rich_text: NotionRichTextItem[] };
        pid: { rich_text: NotionRichTextItem[] };
        Topics: { multi_select: NotionSelectOption[] };
        Thumbnail: { url: string | null };
        GitHub: { url: string | null };
        URL: { url: string | null };
        Category: { select: NotionSelectOption | null };
        Project: { checkbox: boolean };
        Public: { checkbox: boolean };
    };
    url: string;
};

/** A project category option returned from a Notion select property */
type NotionProjectType = {
    id: string;
    name: string;
    color?: string;
};

// ---------------------------------------------------------------------------
// Testimonial database page
// ---------------------------------------------------------------------------
type NotionTestimonialPage = {
    id: string;
    properties: {
        Name: { rich_text: NotionRichTextItem[] };
        Company: { rich_text: NotionRichTextItem[] };
        Position: { rich_text: NotionRichTextItem[] };
        Rating: { select: { name: string } | null };
        Platform: { select: { name: string } | null };
        Project: { rich_text: NotionRichTextItem[] };
        Avatar: { url: string | null };
        Remark: { title: NotionRichTextItem[] };
        Date: { date: { start: string } | null };
    };
};

// ---------------------------------------------------------------------------
// Social link unified model
// ---------------------------------------------------------------------------

/**
 * A social network entry that supports both icon-only (Navbar/Footer)
 * and icon+handle (Hero) display modes.
 * `icon` is a react-icons IconType (component reference, not a JSX element)
 * so consumers render it as `<Icon />` or pass it as a prop.
 */
type SocialLinkEntry = {
    /** Display title, e.g. "LinkedIn" */
    title: string;
    /** Human-readable handle, e.g. "@Anujjoshi3105" */
    name: string;
    /** Full URL, e.g. "https://linkedin.com/in/…" */
    href: string;
    /**
     * react-icons component reference.
     * Type intentionally kept as a callable React component to avoid importing
     * IconType from "react-icons" inside a global declaration file.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: React.ComponentType<any>;
};
