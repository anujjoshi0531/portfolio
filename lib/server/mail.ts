import nodemailer from "nodemailer";
import { serverConfig } from "../constant/config.server";
import { getInquiryTemplate } from "./templates/inquiry";
import { getThankYouTemplate } from "./templates/thank-you";
import { getSubscriptionTemplate } from "./templates/subscription";
import { getWeeklyNewsletterTemplate, BlogPreview } from "./templates/weekly-newsletter";

export type { BlogPreview };

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: serverConfig.MAIL_USER,
    pass: serverConfig.MAIL_PASS,
  },
});

export const sendToRecipient = async (
  name: string,
  email: string,
  msg: string
) => {
  const mailOptions = {
    from: serverConfig.MAIL_DISPLAY,
    to: serverConfig.USER_MAIL,
    subject: `New Message from ${name} via Portfolio`,
    html: getInquiryTemplate(name, email, msg),
  };
  return transporter.sendMail(mailOptions);
};

// Function to send a thank-you email
export const sendThankYouEmail = async (name: string, email: string, msg?: string) => {
  const mailOptions = {
    from: serverConfig.MAIL_DISPLAY,
    to: email,
    subject: `Thank you for reaching out! - ${serverConfig.USER_NAME}`,
    html: getThankYouTemplate(name, msg),
  };
  return transporter.sendMail(mailOptions);
};

// Function to send subscription welcome email
export const sendSubscriptionEmail = async (email: string, subscriberId: string) => {
  const unsubscribeLink = `${serverConfig.USER_URL || "http://localhost:3000"}/unsubscribe?id=${subscriberId}`;
  const mailOptions = {
    from: serverConfig.MAIL_DISPLAY,
    to: email,
    subject: `Welcome to the Newsletter! - ${serverConfig.USER_NAME}`,
    html: getSubscriptionTemplate(unsubscribeLink),
  };
  return transporter.sendMail(mailOptions);
};

export const sendWeeklyNewsletter = async (email: string, name: string, subscriberId: string, recentBlogs: BlogPreview[] = []) => {
  const unsubscribeLink = `${serverConfig.USER_URL || "http://localhost:3000"}/unsubscribe?id=${subscriberId}`;
  const mailOptions = {
    from: serverConfig.MAIL_DISPLAY,
    to: email,
    subject: `Weekly Update - ${serverConfig.USER_NAME}`,
    html: getWeeklyNewsletterTemplate(name, recentBlogs, unsubscribeLink),
  };
  return transporter.sendMail(mailOptions);
};
