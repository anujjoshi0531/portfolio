import { serverConfig } from "@/lib/config/server";

export interface BlogPreview {
  title: string;
  description: string;
  slug: string;
  image: string;
  readingTime?: string;
  category?: string;
}

export const getWeeklyNewsletterTemplate = (
  name: string,
  recentBlogs: BlogPreview[],
  unsubscribeLink: string
) => {
  const issueDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const blogCards = recentBlogs
    .map(
      (blog) => `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1a1a1a;border:1px solid #262626;border-radius:14px;overflow:hidden;margin-bottom:20px;">
      <tr>
        <td>
          <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="display:block;">
            <img src="${blog.image}" alt="${blog.title}" width="100%" style="display:block;width:100%;height:190px;object-fit:cover;border-bottom:1px solid #262626;" />
          </a>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding:22px 26px 26px;">
                <!-- Meta row -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:12px;">
                  <tr>
                    ${blog.category ? `<td style="padding-right:10px;"><span style="display:inline-block;background:#1c1200;border:1px solid #78350f;border-radius:100px;padding:3px 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#f97316;">${blog.category}</span></td>` : ""}
                    ${blog.readingTime ? `<td><span style="font-size:12px;color:#525252;font-weight:500;">⏱ ${blog.readingTime} read</span></td>` : ""}
                  </tr>
                </table>
                <h3 style="margin:0 0 10px;font-size:18px;font-weight:800;line-height:1.3;letter-spacing:-0.02em;">
                  <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="color:#ffffff;text-decoration:none;">${blog.title}</a>
                </h3>
                <p style="margin:0 0 18px;font-size:13px;color:#737373;line-height:1.7;">${blog.description}</p>
                <a href="${serverConfig.USER_URL}/blog/${blog.slug}" style="display:inline-block;padding:9px 18px;background-color:#f97316;color:#ffffff;text-decoration:none;font-weight:700;font-size:12px;border-radius:8px;">
                  Read Article →
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Weekly Newsletter — ${serverConfig.USER_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0a;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;">

        <!-- Top brand bar -->
        <tr>
          <td style="padding-bottom:20px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td>
                  <a href="${serverConfig.USER_URL}" style="text-decoration:none;font-size:15px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                    <span style="color:#f97316;">&lt;/&gt;</span> ${serverConfig.USER_NAME}
                  </a>
                </td>
                <td style="text-align:right;">
                  <span style="font-size:11px;color:#525252;font-weight:500;">${issueDate}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden;">

            <!-- Header -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:44px 40px 36px;border-bottom:1px solid #262626;">
                  <!-- Badge -->
                  <div style="display:inline-block;background:#1a1a1a;border:1px solid #f97316;border-radius:100px;padding:5px 14px;margin-bottom:20px;">
                    <span style="font-size:11px;font-weight:700;color:#f97316;letter-spacing:0.08em;text-transform:uppercase;">📬 Weekly Digest</span>
                  </div>
                  <h1 style="margin:0 0 14px;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">
                    Your weekly update,<br><span style="color:#f97316;">Hello ${name}!</span>
                  </h1>
                  <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.7;max-width:400px;">
                    Here's your curated dose of articles, insights, and updates in software engineering, web development, and tech — straight from my desk.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:36px 40px 32px;">

                  <!-- Author note -->
                  <div style="background:#1a1a1a;border:1px solid #262626;border-left:3px solid #f97316;border-radius:10px;padding:16px 20px;margin-bottom:32px;">
                    <p style="margin:0;font-size:13px;color:#a3a3a3;line-height:1.7;">
                      ✍️ <strong style="color:#ffffff;">A note from me:</strong> I hand-pick every piece of content I share. If something resonates with you, hit reply — I'd love to hear your thoughts!
                    </p>
                  </div>

                  ${recentBlogs.length > 0 ? `
                  <!-- Section label -->
                  <p style="margin:0 0 18px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;border-bottom:1px solid #262626;padding-bottom:12px;">📚 Latest Articles</p>
                  ${blogCards}
                  ` : `
                  <div style="text-align:center;padding:40px 0;background:#1a1a1a;border:1px solid #262626;border-radius:12px;margin-bottom:28px;">
                    <p style="margin:0;font-size:15px;color:#525252;">No new articles this week — but stay tuned! 🚀</p>
                  </div>
                  `}

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:8px 0 28px;">

                  <!-- Browse all CTA -->
                  <div style="text-align:center;margin-bottom:32px;">
                    <p style="margin:0 0 18px;font-size:14px;color:#a3a3a3;">Want to explore all my writing in one place?</p>
                    <a href="${serverConfig.USER_URL}/blog" style="display:inline-block;padding:14px 36px;background-color:#f97316;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;border-radius:10px;letter-spacing:0.01em;">
                      Browse All Articles →
                    </a>
                  </div>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:0 0 28px;">

                  <!-- Connect section -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1a1a1a;border:1px solid #262626;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                    <tr>
                      <td style="padding:22px 24px;text-align:center;">
                        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#ffffff;">Let's stay connected</p>
                        <p style="margin:0 0 16px;font-size:12px;color:#525252;">Got feedback, a project idea, or just want to say hi?</p>
                        <a href="${serverConfig.USER_URL}#contact" style="display:inline-block;padding:10px 22px;background:#f97316;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;border-radius:8px;">
                          Get In Touch
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Social links -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                    <tr>
                      <td style="padding:0 6px;">
                        <a href="https://linkedin.com/in/anujjoshi3105" style="display:inline-block;padding:8px 14px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:11px;font-weight:600;">
                          in LinkedIn
                        </a>
                      </td>
                      <td style="padding:0 6px;">
                        <a href="https://twitter.com/Anujjoshi3105" style="display:inline-block;padding:8px 14px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:11px;font-weight:600;">
                          𝕏 Twitter
                        </a>
                      </td>
                      <td style="padding:0 6px;">
                        <a href="https://t.me/Anujjoshi3105" style="display:inline-block;padding:8px 14px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:11px;font-weight:600;">
                          ✈ Telegram
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:0 0 22px;">

                  <!-- Unsubscribe -->
                  <p style="margin:0;font-size:12px;color:#525252;text-align:center;line-height:1.6;">
                    You're receiving this because you subscribed to my newsletter.<br>
                    Don't want these? <a href="${unsubscribeLink}" style="color:#f97316;text-decoration:none;font-weight:600;">Unsubscribe here</a>
                  </p>

                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border-top:1px solid #262626;padding:24px 40px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td>
                        <p style="margin:0 0 2px;font-size:14px;font-weight:800;color:#ffffff;">${serverConfig.USER_NAME}</p>
                        <p style="margin:0;font-size:12px;color:#525252;">Fullstack Developer</p>
                      </td>
                      <td style="text-align:right;">
                        <a href="${serverConfig.USER_URL}" style="font-size:12px;color:#f97316;text-decoration:none;font-weight:600;">${serverConfig.USER_URL}</a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:14px 0 0;font-size:11px;color:#404040;text-align:center;line-height:1.6;">
                    © ${new Date().getFullYear()} ${serverConfig.USER_NAME} · All rights reserved
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
};
