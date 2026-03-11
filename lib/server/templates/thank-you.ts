import { serverConfig } from "../../constant/config.server";

export const getThankYouTemplate = (name: string, msg?: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank You — ${serverConfig.USER_NAME}</title>
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
                  <span style="font-size:11px;color:#525252;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;">Auto Reply</span>
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
                <td style="padding:46px 40px 40px;border-bottom:1px solid #262626;text-align:center;">
                  <div style="display:inline-block;width:68px;height:68px;background:#1a1a1a;border:2px solid #f97316;border-radius:50%;text-align:center;line-height:68px;font-size:28px;margin-bottom:22px;">✅</div>
                  <h1 style="margin:0 0 12px;color:#ffffff;font-size:30px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">
                    Got your message,<br><span style="color:#f97316;">${name}!</span>
                  </h1>
                  <p style="margin:0 auto;max-width:380px;color:#a3a3a3;font-size:14px;line-height:1.7;">
                    I personally read every inquiry and will get back to you within <strong style="color:#ffffff;">24–48 hours</strong>.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:36px 40px 32px;">

                  <!-- Intro -->
                  <p style="margin:0 0 28px;font-size:15px;color:#a3a3a3;line-height:1.75;">
                    Hi ${name} 👋,<br><br>
                    Thank you for taking the time to reach out through my portfolio. Your message is important to me and I always respond personally. I appreciate your interest and I'm looking forward to connecting!
                  </p>

                  <!-- What happens next -->
                  <p style="margin:0 0 16px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;">What happens next</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                    <!-- Steps -->
                    <tr>
                      <td style="padding-bottom:18px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:40px;vertical-align:top;">
                              <div style="width:30px;height:30px;background:#f97316;border-radius:50%;text-align:center;line-height:30px;font-size:13px;font-weight:800;color:#ffffff;">1</div>
                            </td>
                            <td style="vertical-align:top;padding-top:4px;">
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:4px;">Message Review</strong>
                              <span style="color:#737373;font-size:13px;line-height:1.5;">I'll read your message carefully and understand exactly what you need.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom:18px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:40px;vertical-align:top;">
                              <div style="width:30px;height:30px;background:#1a1a1a;border:2px solid #f97316;border-radius:50%;text-align:center;line-height:26px;font-size:13px;font-weight:800;color:#f97316;">2</div>
                            </td>
                            <td style="vertical-align:top;padding-top:4px;">
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:4px;">Thoughtful Response</strong>
                              <span style="color:#737373;font-size:13px;line-height:1.5;">I'll craft a personalized reply tailored to your specific needs.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="width:40px;vertical-align:top;">
                              <div style="width:30px;height:30px;background:#1a1a1a;border:2px solid #262626;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:800;color:#525252;">3</div>
                            </td>
                            <td style="vertical-align:top;padding-top:4px;">
                              <strong style="display:block;color:#ffffff;font-size:14px;font-weight:700;margin-bottom:4px;">Reply in 24–48h</strong>
                              <span style="color:#737373;font-size:13px;line-height:1.5;">Watch your inbox — my reply will arrive directly to your email.</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${msg ? `<!-- Message copy -->
                  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;">Copy of your message</p>
                  <div style="background:#1a1a1a;border:1px solid #262626;border-left:3px solid #f97316;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                    <p style="margin:0;color:#d4d4d4;font-size:14px;line-height:1.8;white-space:pre-wrap;font-style:italic;">"${msg}"</p>
                  </div>` : ''}

                  <!-- Tip callout -->
                  <div style="background:#1c1200;border:1px solid #78350f;border-radius:10px;padding:14px 18px;margin-bottom:32px;">
                    <p style="margin:0;font-size:13px;color:#fbbf24;line-height:1.6;">
                      💬 <strong>Need to add something?</strong> Just reply to this email and I'll see it alongside your original message.
                    </p>
                  </div>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #262626;margin:0 0 28px;">

                  <!-- CTAs -->
                  <p style="margin:0 0 18px;font-size:14px;color:#a3a3a3;line-height:1.7;">While you wait, explore my work:</p>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td style="padding-right:12px;">
                        <a href="${serverConfig.USER_URL}" style="display:inline-block;padding:12px 26px;background-color:#f97316;color:#ffffff;text-decoration:none;font-weight:800;font-size:13px;border-radius:9px;">
                          View Portfolio →
                        </a>
                      </td>
                      <td>
                        <a href="${serverConfig.USER_URL}/blog" style="display:inline-block;padding:12px 26px;background:#1a1a1a;border:1px solid #262626;color:#a3a3a3;text-decoration:none;font-weight:600;font-size:13px;border-radius:9px;">
                          Read Blog
                        </a>
                      </td>
                    </tr>
                  </table>

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
                    This is an automated receipt confirmation. I'll follow up personally soon.
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
