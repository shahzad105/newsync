export const getVerificationEmailTemplate = (username, verificationUrl) => {
  return `
  <!DOCTYPE html>
  <html lang="en" style="margin: 0; padding: 0; font-family: 'Poppins', sans-serif;">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <style>
      body {
        background: linear-gradient(to right, #eef2f3, #8e9eab);
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 50px auto;
        background: #fff;
        border-radius: 12px;
        padding: 40px 30px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      }

      .header {
        text-align: center;
        color: #333;
      }

      .header h2 {
        margin-bottom: 10px;
        font-size: 26px;
        color: #2f3542;
      }

      .content {
        font-size: 16px;
        color: #444;
        margin-top: 20px;
        line-height: 1.6;
      }

      .btn {
        display: inline-block;
        margin: 30px 0;
        background: linear-gradient(to right, #0061f2, #3a8dff);
        color: #fff;
        padding: 14px 30px;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 14px rgba(0, 97, 242, 0.3);
        transition: transform 0.3s ease;
      }

      .btn:hover {
        transform: translateY(-2px);
      }

      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #888;
        text-align: center;
      }

      @media only screen and (max-width: 600px) {
        .container {
          padding: 30px 20px;
        }

        .btn {
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h2>Verify Your Email</h2>
      </div>
      <div class="content">
        <p>Hello <strong>${username}</strong>,</p>
        <p>Thanks for joining <strong>Newsync</strong>! To get started, please confirm your email address by clicking the button below.</p>
        <div style="text-align: center;">
          <a href="${verificationUrl}" class="btn">Verify Email Now</a>
        </div>
        <p>If you didn’t sign up, please ignore this email. This link will expire in 30 minutes.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Newsync. All rights reserved.
      </div>
    </div>
  </body>

  </html>
  `;
};
