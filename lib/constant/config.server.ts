import "server-only";

export const serverConfig = {
    MAIL_USER: process.env.MAIL_USER || "XXXXXXXXXX",
    MAIL_PASS: process.env.MAIL_PASS || "XXXXXXXXXX",
    MAIL_DISPLAY: process.env.MAIL_DISPLAY || "XXXXXXXXXX",
    USER_MAIL: process.env.USER_MAIL || "XXXXXXXXXX",
    USER_NAME: process.env.USER_NAME || "XXXXXXXXXX",
    USER_URL: process.env.USER_URL || "https://anujjoshi.netlify.app",
};
