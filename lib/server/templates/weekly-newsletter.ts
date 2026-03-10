import { serverConfig } from "../../constant/config.server";

export interface BlogPreview {
  title: string;
  description: string;
  slug: string;
  image: string;
}

export const getWeeklyNewsletterTemplate = (name: string, recentBlogs: BlogPreview[], unsubscribeLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekly Newsletter</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; color: #1f2937; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 650px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);">
    
    <!-- Hero Header -->
    <div style="background: center / cover no-repeat url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop'); background-color: #111827; position: relative;">
      <div style="background: linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.8)); padding: 50px 40px;">
        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.025em; line-height: 1.2;">Weekly Update<br><span style="color: #6366f1;">from ${serverConfig.USER_NAME}</span></h1>
      </div>
    </div>
    
    <!-- Body Content -->
    <div style="padding: 40px;">
      <p style="margin: 0 0 20px; font-size: 17px; color: #4b5563; line-height: 1.7;">Hello ${name},</p>
      <p style="margin: 0 0 24px; font-size: 17px; color: #4b5563; line-height: 1.7;">Here is your weekly update with my latest articles and insights on software engineering, web development, and tech trends.</p>
      
      ${recentBlogs.length > 0 ? `
      <!-- Blogs List -->
      <div style="margin-bottom: 30px;">
        <h2 style="margin: 0 0 20px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; font-weight: 700; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Latest Posts</h2>
        ${recentBlogs.map(blog => `
        <div style="margin-bottom: 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Thumbnail Image -->
          <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="display: block;">
            <img src="${blog.image}" alt="${blog.title}" style="width: 100%; height: 200px; object-fit: cover; display: block; border-bottom: 1px solid #e5e7eb;">
          </a>
          <!-- Content -->
          <div style="padding: 24px;">
            <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 800; line-height: 1.3;">
              <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="color: #111827; text-decoration: none;">${blog.title}</a>
            </h3>
            <p style="margin: 0 0 16px; font-size: 15px; color: #4b5563; line-height: 1.6;">${blog.description}</p>
            <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="display: inline-block; color: #4f46e5; text-decoration: none; font-weight: 600; font-size: 14px; background-color: #e0e7ff; padding: 8px 16px; border-radius: 6px;">Read article &rarr;</a>
          </div>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- CTA Button -->
      <div style="margin-top: 10px; margin-bottom: 30px;">
        <a href="${serverConfig.USER_URL}/blog" style="display: inline-block; padding: 16px 32px; background-color: #111827; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px; transition: all 0.2s ease; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);">Read All Articles</a>
      </div>

      <p style="margin: 0 0 10px; font-size: 14px; color: #9ca3af; line-height: 1.5;">If you'd like to stop receiving these emails, you can unsubscribe below.</p>
      <p style="margin: 0; font-size: 14px;"><a href="${unsubscribeLink}" style="color: #6366f1; text-decoration: none;">Unsubscribe</a></p>
    </div>
    
  </div>
</body>
</html>
`;
