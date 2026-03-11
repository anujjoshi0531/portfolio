import { serverConfig } from "../../constant/config.server";

// ─── Brand tokens (match website globals.css dark theme) ───────────────────
// bg:       #0a0a0a   (hsl 0 0% 3.9%)
// card:     #141414   (hsl 0 0% 8%)
// border:   #262626   (hsl 0 0% 14.9%)
// accent:   #f97316   (orange-500 — site primary CTA color)
// muted:    #a3a3a3   (hsl 0 0% 63.9%)
// ───────────────────────────────────────────────────────────────────────────

export const getInquiryTemplate = (name: string, email: string, msg: string) => {
  const receivedAt = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Portfolio Inquiry — ${serverConfig.USER_NAME}</title>
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
                  <span style="font-size:11px;color:#525252;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;">Portfolio Server</span>
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
                <td style="padding:40px 40px 36px;border-bottom:1px solid #262626;">
                  <!-- Badge -->
                  <div style="display:inline-block;background:#1a1a1a;border:1px solid #f97316;border-radius:100px;padding:5px 14px;margin-bottom:20px;">
                    <span style="font-size:11px;font-weight:700;color:#f97316;letter-spacing:0.08em;text-transform:uppercase;">📬 New Inquiry</span>
                  </div>
                  <h1 style="margin:0 0 12px;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;">
                    Someone wants to<br><span style="color:#f97316;">connect with you</span>
                  </h1>
                  <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.65;max-width:400px;">
                    A visitor submitted a contact form on your portfolio. Details are below.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="padding:32px 40px;">

                  <!-- Timestamp pill -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                    <tr>
                      <td style="background:#1a1a1a;border:1px solid #262626;border-radius:10px;padding:14px 20px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td>
                              <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#f97316;font-weight:700;display:block;margin-bottom:4px;">Received At</span>
                              <span style="font-size:13px;color:#e5e5e5;font-weight:500;">${receivedAt}</span>
                            </td>
                            <td style="text-align:right;">
                              <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#f97316;font-weight:700;display:block;margin-bottom:4px;">Source</span>
                              <span style="font-size:13px;color:#e5e5e5;font-weight:500;">Portfolio Contact Form</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Section label -->
                  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;">Contact Information</p>

                  <!-- Sender card -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1a1a1a;border:1px solid #262626;border-radius:12px;overflow:hidden;margin-bottom:28px;">
                    <tr>
                      <td style="padding:16px 22px;border-bottom:1px solid #262626;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="color:#525252;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;width:70px;">Name</td>
                            <td style="color:#ffffff;font-size:15px;font-weight:700;">${name}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 22px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="color:#525252;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;width:70px;">Email</td>
                            <td><a href="mailto:${email}" style="color:#f97316;font-size:15px;font-weight:700;text-decoration:none;">${email}</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Message -->
                  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#525252;font-weight:700;">Message</p>
                  <div style="background:#1a1a1a;border:1px solid #262626;border-left:3px solid #f97316;border-radius:12px;padding:22px 24px;margin-bottom:32px;">
                    <p style="margin:0;color:#d4d4d4;font-size:15px;line-height:1.8;white-space:pre-wrap;font-style:italic;">"${msg}"</p>
                  </div>

                  <!-- Tip -->
                  <div style="background:#1c1200;border:1px solid #78350f;border-radius:10px;padding:14px 18px;margin-bottom:32px;">
                    <p style="margin:0;font-size:13px;color:#fbbf24;line-height:1.6;">
                      💡 <strong>Pro tip:</strong> Replying within 24–48 hours makes the best impression.
                    </p>
                  </div>

                  <!-- Reply CTA -->
                  <a href="mailto:${email}?subject=Re:%20Your%20Portfolio%20Inquiry&body=Hi%20${encodeURIComponent(name)}%2C%0A%0AThank%20you%20for%20reaching%20out!%0A%0A" style="display:inline-block;padding:14px 32px;background-color:#f97316;color:#ffffff;text-decoration:none;font-weight:800;font-size:15px;border-radius:10px;letter-spacing:0.01em;">
                    ✉️ Reply to ${name}
                  </a>

                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="border-top:1px solid #262626;padding:28px 40px;">
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
                  <p style="margin:16px 0 0;font-size:11px;color:#404040;text-align:center;line-height:1.6;">
                    Automated notification from your portfolio server. Do not reply to this email directly.
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
