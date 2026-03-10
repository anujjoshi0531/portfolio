import { serverConfig } from "../../constant/config.server";

export const getInquiryTemplate = (name: string, email: string, msg: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Response</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; color: #1f2937; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 650px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 40px 32px; text-align: left; position: relative;">
      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">New Inquiry Received</h1>
      <p style="margin: 10px 0 0; color: #e0e7ff; font-size: 16px; max-width: 80%;">You have a new contact message from your portfolio site.</p>
    </div>
    
    <!-- Content Body -->
    <div style="padding: 40px 32px;">
      
      <!-- Sender Info Card -->
      <div style="margin-bottom: 32px;">
        <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Contact Information</h2>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 80px; font-size: 15px; vertical-align: top;">Name:</td>
              <td style="padding: 10px 0; color: #111827; font-size: 16px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 80px; font-size: 15px; vertical-align: top; border-top: 1px solid #e5e7eb;">Email:</td>
              <td style="padding: 10px 0; color: #111827; font-size: 16px; font-weight: 500; border-top: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${email}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      
      <!-- Message Card -->
      <div>
        <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Message Details</h2>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-left: 4px solid #4f46e5; border-radius: 12px; padding: 24px; color: #374151; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${msg}</div>
      </div>
      
      <!-- Action Button -->
      <div style="margin-top: 40px; text-align: left;">
        <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4);">Reply to ${name}</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 32px; text-align: center;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">Automated message sent securely via <a href="${serverConfig.USER_URL}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Your Portfolio Server</a></p>
    </div>
  </div>
</body>
</html>
`;
