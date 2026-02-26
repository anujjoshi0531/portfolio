import nodemailer from "nodemailer";
import { serverConfig } from "../constant/config.server";

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
    from: serverConfig.MAIL_USER,
    to: serverConfig.USER_MAIL,
    subject: `Portfolio Response - ${name}`,
    html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Arial', sans-serif; color: #333; line-height: 1.6;">
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <header style="background-color: #4F46E5; padding: 20px; text-align: center; color: #fff;">
            <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
              Portfolio Response
            </h2>
          </header>
          <main style="padding: 40px 30px; background-color: #fafafa;">
            <h4 style="margin: 0 0 20px; font-size: 18px; color: #555;">
              <strong style="color: #4F46E5;">Name:</strong> ${name}
            </h4>
            <h4 style="margin: 0 0 20px; font-size: 18px; color: #555;">
              <strong style="color: #4F46E5;">Email:</strong> ${email}
            </h4>
            <div style="padding: 20px; background-color: #efefef; border: 1px solid #e0e0e0; border-radius: 6px;">
              <p style="font-size: 16px; color: #555;">${msg}</p>
            </div>
          </main>
          <footer style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; color: #555;">Powered by <a href="${serverConfig.USER_URL}" style="color: #4F46E5;">${serverConfig.USER_NAME}</a></p>
          </footer>
        </div>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
};

// Function to send a thank-you email
export const sendThankYouEmail = async (name: string, email: string) => {
  const mailOptions = {
    from: serverConfig.MAIL_USER,
    to: email,
    subject: `${serverConfig.USER_NAME} - Thank You for Reaching Out`,
    html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Arial', sans-serif; color: #333; line-height: 1.6;">
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <header style="background-color: #4F46E5; padding: 20px; text-align: center; color: #fff;">
            <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Thank you, ${name}!</h2>
          </header>
          <main style="padding: 30px; background-color: #fafafa;">
            <p>We've received your message and will get back to you shortly. If you have further questions, feel free to reply to this email.</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${serverConfig.USER_URL}" style="padding: 10px 20px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 6px;">Visit Us</a>
            </div>
          </main>
          <footer style="background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; color: #555;">Powered by <a href="${serverConfig.USER_URL}" style="color: #4F46E5;">${serverConfig.USER_NAME}</a></p>
          </footer>
        </div>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
};