import axios from "axios";

const apiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;
const senderName = process.env.SENDER_NAME;
const serviceUrl = process.env.EMAIL_SERVICE_URL;

export const sendResetEmail = (
  userName,
  userEmail,
  resetPasswordLink,
  tempPassword
) => {
  const data = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: userEmail || "soumyashreebaral148@gmail.com" }],
    subject: "Welcome to AirRack! - Account Created",
    htmlContent: `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; font-size: 14px; }
            .header { background: #000; height: 100px; padding: 0; text-align: left; }
            .logo { height: 100%; margin-left: 40px; }
            .container { padding: 30px 40px; font-size: 14px; }
            .greeting { font-size: 14px; margin-bottom: 20px; }
            .username { font-weight: bold; }
            .password { font-weight: bold; color: #ff6600; background: #f5f5f5; }
            .important { font-weight: bold; color: #000; }
            .links { margin: 15px 0; }
            .links a { color: #0073e6; text-decoration: none; }
            .privacy { margin-top: 20px; font-size: 14px; }
            .footer { margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://drive.google.com/uc?export=view&id=1Y_0Vh5kbFiVJcBsDxYue8KwWY0Yf5k_J" alt="AirRack Logo" class="logo" />
          </div>
          <div class="container">
            <div class="greeting">
              Dear <span class="username">${userName}</span>,
            </div>
            <div>
              Welcome to AirRack! Your user account has been successfully created.
              <br /><br />
              <strong>Login Credentials:</strong><br /><br />
              <span class="username">Email: ${userEmail}</span><br />
              <span class="password">Temporary Password: ${tempPassword}</span>
              <br /><br />
              You can use these credentials to log in temporarily. For security reasons, please reset your password using the link below:
              <br /><br />
              <a href=${resetPasswordLink} target="_blank" rel="noopener noreferrer" style="background: #ff6600; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Set Your New Password
              </a>
              <br /><br />
              <span class="important">This temporary password expires in 24 hours.</span>
              <div class="footer">
                Best Regards,<br />
                Airfleet Managers
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  axios
    .post(serviceUrl, data, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Email sent successfully
    })
    .catch((error) => {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
    });
};


export const forgotPasswordEmail = (userName, userEmail, forgotPasswordLink) => {
  const data = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: userEmail || "soumyashreebaral148@gmail.com" }],
    subject: "Forgot Password - Reset Your Password",
    htmlContent: `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; font-size: 14px; }
            .header { background: #000; height: 100px; padding: 0; text-align: left; }
            .logo { height: 100%; margin-left: 40px; }
            .container { padding: 30px 40px; font-size: 14px; }
            .greeting { font-size: 14px; margin-bottom: 20px; }
            .username { font-weight: bold; }
            .important { font-weight: bold; color: #000; }
            .links { margin: 15px 0; }
            .links a { color: #0073e6; text-decoration: none; }
            .privacy { margin-top: 20px; font-size: 14px; }
            .footer { margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://drive.google.com/uc?export=view&id=1Y_0Vh5kbFiVJcBsDxYue8KwWY0Yf5k_J" alt="AirRack Logo" class="logo" />
          </div>
          
          <div class="container">
            <div class="greeting">
              Dear <span class="username">${userName}</span>,
            </div>
            <div>
              Hope you are doing well. We received a request to reset your password.
              <br /><br />
              Please Click this link:
              <a href=${forgotPasswordLink} target="_blank" rel="noopener noreferrer">
                Reset your password
              </a>
              <div class="footer">
                Best Regards,<br />
                Airfleet Managers
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  axios
    .post(serviceUrl, data, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Email sent successfully
    })
    .catch((error) => {
      console.error(
        "Error sending email:",
        error.response ? error.response.data : error.message
      );
    });
};