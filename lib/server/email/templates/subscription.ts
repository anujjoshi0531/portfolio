import { serverConfig } from "@/lib/config/server";

export const getSubscriptionTemplate = (unsubscribeLink: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to the Newsletter — ${serverConfig.USER_NAME}</title>
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
                  <span style="font-size:11px;color:#525252;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;">Newsletter</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background-color:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden;">

            <!-- Hero header -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:50px 40px 40px;border-bottom:1px solid #262626;text-align:center;">
                  <!-- Icon ring -->
                  <div style="display:inline-block;width:68px;height:68px;background:#1a1a1a;border:2px solid #f97316;border-radius:50%;text-align:center;line-height:68px;font-size:28px;margin-bottom:22px;">🎉</div>
                  <h1 style="margin:0 0 14px;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">
                    You're officially in,<br><span style="color:#f97316;">welcome aboard!</span>
                  </h1>
                  <p style="margin:0 auto;max-width:380px;color:#a3a3a3;font-size:14px;line-height:1.7;">
                    Thank you for subscribing! I'm excited to share ideas, updates, and insights with you — straight from my desk.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:36px 40px 32px;">

                  <!-- What to expect -->
                  <p style="margin:0 0 14px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;">What you'll receive</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1a1a1a;border:1px solid #262626;border-radius:12px;overflow:hidden;margin-bottom:32px;">
                    <tr>
                      <td style="padding:18px 22px;border-bottom:1px solid #262626;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:36px;font-size:18px;">📝</td>
                            <td>
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:3px;">Articles &amp; Deep Dives</strong>
                              <span style="color:#737373;font-size:13px;">Web dev, software engineering, and tech insights.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 22px;border-bottom:1px solid #262626;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:36px;font-size:18px;">🚀</td>
                            <td>
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:3px;">Project Launches &amp; Updates</strong>
                              <span style="color:#737373;font-size:13px;">Be the first to know what I'm building and shipping.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 22px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:36px;font-size:18px;">💡</td>
                            <td>
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:3px;">Tips, Tools &amp; Resources</strong>
                              <span style="color:#737373;font-size:13px;">Curated picks that make me more productive — shared with you.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- CTA -->
                  <div style="text-align:center;margin-bottom:36px;">
                    <a href="${serverConfig.USER_URL}" style="display:inline-block;padding:15px 40px;background-color:#f97316;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;border-radius:10px;letter-spacing:0.01em;">
                      Explore Portfolio →
                    </a>
                  </div>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:0 0 24px;">

                  <!-- Social links -->
                  <p style="margin:0 0 16px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;text-align:center;">Find me online</p>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                    <tr>
                      <td style="padding:0 8px;">
                        <a href="https://linkedin.com/in/anujjoshi3105" style="display:inline-block;padding:8px 16px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:12px;font-weight:600;">
                          in LinkedIn
                        </a>
                      </td>
                      <td style="padding:0 8px;">
                        <a href="https://twitter.com/Anujjoshi3105" style="display:inline-block;padding:8px 16px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:12px;font-weight:600;">
                          𝕏 Twitter
                        </a>
                      </td>
                      <td style="padding:0 8px;">
                        <a href="https://t.me/Anujjoshi3105" style="display:inline-block;padding:8px 16px;background:#1a1a1a;border:1px solid #262626;border-radius:8px;color:#a3a3a3;text-decoration:none;font-size:12px;font-weight:600;">
                          ✈ Telegram
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:0 0 22px;">

                  <!-- Unsubscribe -->
                  <p style="margin:0;font-size:12px;color:#525252;text-align:center;line-height:1.6;">
                    Joined by mistake? No worries —
                    <a href="${unsubscribeLink}" style="color:#f97316;text-decoration:none;font-weight:600;">Unsubscribe here</a>
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
                    You are receiving this because you subscribed at ${serverConfig.USER_URL}
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
