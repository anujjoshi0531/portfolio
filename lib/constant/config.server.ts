import "server-only";

export const serverConfig = {
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID || "XXXXXXXXXX",
    NOTION_EDUCATION_ID: process.env.NOTION_EDUCATION_ID || "XXXXXXXXXX",
    NOTION_EXPERIENCE_ID: process.env.NOTION_EXPERIENCE_ID || "XXXXXXXXXX",
    NOTION_PROJECT_ID: process.env.NOTION_PROJECT_ID || "XXXXXXXXXX",
    NOTION_TESTIMONIAL_ID: process.env.NOTION_TESTIMONIAL_ID || "XXXXXXXXXX",
    NOTION_TOKEN: process.env.NOTION_TOKEN || "XXXXXXXXXX",
    MAIL_USER: process.env.MAIL_USER || "XXXXXXXXXX",
    MAIL_PASS: process.env.MAIL_PASS || "XXXXXXXXXX",
    USER_MAIL: process.env.USER_MAIL || "XXXXXXXXXX",
    USER_NAME: process.env.USER_NAME || "XXXXXXXXXX",
    USER_URL: process.env.USER_URL || "https://anujjoshi.netlify.app",
};
