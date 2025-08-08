export const getForgotPasswordEmailTemplate = (username, resetUrl) => {
  return `
  <!DOCTYPE html>
  <html lang="en" style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          padding: 20px !important;
        }
        .button {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f2f4f6;">
    <div class="container" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50; text-align: center;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #2c3e50;">
        Hello <strong>${username}</strong>,
      </p>
      <p style="font-size: 16px; color: #2c3e50;">
        We received a request to reset your password. Click the button below to reset it. This link will expire in 30 minutes.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" class="button" style="padding: 14px 28px; background-color: #e74c3c; color: white; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #636e72;">
        If you didn't request this, you can safely ignore this email.
      </p>
      <p style="font-size: 12px; color: #b2bec3; margin-top: 40px; text-align: center;">
        &copy; ${new Date().getFullYear()} Newsync. All rights reserved.
      </p>
    </div>
  </body>
  </html>
  `;
};
