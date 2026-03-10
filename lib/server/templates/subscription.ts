import { serverConfig } from "../../constant/config.server";

export const getSubscriptionTemplate = (unsubscribeLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter Subscription</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 650px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);">
    
    <!-- Hero Header -->
    <div style="background: center / cover no-repeat url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop'); background-color: #111827; position: relative;">
      <div style="background: linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.8)); padding: 50px 40px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.025em; line-height: 1.2;">Congratulations!<br><span style="color: #6366f1;">You're subscribed.</span></h1>
      </div>
    </div>
    
    <!-- Body Content -->
    <div style="padding: 40px;">
      <p style="margin: 0 0 20px; font-size: 17px; color: #4b5563; line-height: 1.7;">Hello,</p>
      <p style="margin: 0 0 24px; font-size: 17px; color: #4b5563; line-height: 1.7;">Thank you for subscribing to my newsletter! I'm thrilled to have you here. You'll now receive regular updates, insights, and exclusive content straight to your inbox.</p>
      
      <!-- CTA Button -->
      <div style="margin-top: 10px; margin-bottom: 30px;">
        <a href="${serverConfig.USER_URL}" style="display: inline-block; padding: 16px 32px; background-color: #111827; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; transition: all 0.2s ease; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);">Explore Portfolio</a>
      </div>

      <p style="margin: 0 0 10px; font-size: 14px; color: #9ca3af; line-height: 1.5;">If you didn't request this, or if you'd like to stop receiving these emails, you can unsubscribe below.</p>
      <p style="margin: 0; font-size: 14px;"><a href="${unsubscribeLink}" style="color: #6366f1; text-decoration: none;">Unsubscribe</a></p>
    </div>
    
  </div>
</body>
</html>
`;
