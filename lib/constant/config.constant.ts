export const config = {
    // Client Config
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://anujjoshi.netlify.app",
    CONTEST_API: process.env.NEXT_PUBLIC_CONTEST_API || "https://api.contest.com",
    GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-XXXXXXXXXX",
    GOOGLE_VERIFICATION_ID: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID || "XXXXXXXXXX",
    CHATBOT_URL: process.env.NEXT_PUBLIC_CHATBOT_URL || "http://localhost:8080",
    CHATBOT_MODEL: process.env.NEXT_PUBLIC_CHATBOT_MODEL || "ollama",
    CHATBOT_AGENT: process.env.NEXT_PUBLIC_CHATBOT_AGENT || "portfolio-agent",

    // Server Config
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

}    