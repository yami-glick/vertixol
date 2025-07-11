require("dotenv").config();
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

// OAuth2 setup for Google Workspace
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:8080" // Redirect URI
);

// Generate authorization URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://mail.google.com/"],
  prompt: "consent", // Force consent to get refresh token
});

console.log("🔐 Google OAuth2 Setup for Vertixol");
console.log("=====================================");
console.log("");
console.log("📋 Follow these steps:");
console.log("");
console.log("1. Go to this URL in your browser:");
console.log(authUrl);
console.log("");
console.log(
  "2. Sign in with your Google Workspace account (info@vertixol.com.cy)"
);
console.log("");
console.log("3. Grant the requested permissions");
console.log("");
console.log("4. Copy the authorization code from the redirect URL");
console.log("");
console.log("5. Run this script again with the code:");
console.log("   node generate-oauth-token.js <AUTHORIZATION_CODE>");
console.log("");
console.log("📝 Make sure you have these in your .env file:");
console.log("   GOOGLE_CLIENT_ID=your-client-id");
console.log("   GOOGLE_CLIENT_SECRET=your-client-secret");
console.log("   EMAIL_USER=info@vertixol.com.cy");
console.log("");

// If authorization code is provided, exchange it for tokens
if (process.argv[2]) {
  const authCode = process.argv[2];

  oauth2Client.getToken(authCode, async (err, tokens) => {
    if (err) {
      console.error("❌ Error getting tokens:", err.message);
      return;
    }

    console.log("✅ Successfully generated OAuth2 tokens!");
    console.log("");
    console.log("📧 Add these to your .env file:");
    console.log("");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}`);
    console.log("");
    console.log(
      "🔒 Keep these tokens secure and never commit them to version control!"
    );
    console.log("");
    console.log("🧪 Testing email configuration...");

    // Test the email configuration
    try {
      const transporter = nodemailer.createTransporter({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: tokens.refresh_token,
          accessToken: tokens.access_token,
        },
      });

      // Verify the connection
      await transporter.verify();
      console.log("✅ Email configuration is working correctly!");
      console.log("🚀 Your contact form is ready to send emails!");
    } catch (error) {
      console.error("❌ Email configuration test failed:", error.message);
    }
  });
}
