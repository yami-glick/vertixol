require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// Set up routes for each page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/physical-security", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "physical-security.html"));
});

app.get("/engineering-risk-assessment", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "engineering-risk-assessment.html")
  );
});

app.get("/risk-management", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "risk-management.html"));
});

app.get("/management-consulting", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "management-consulting.html"));
});

// Email endpoint
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: "info@vertixol.com.cy",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This message was sent from the Vertixol website contact form.</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again.",
    });
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Vertixol website server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
  });
}

// Export for Cloud Functions
exports.vertixolWebsite = app;
