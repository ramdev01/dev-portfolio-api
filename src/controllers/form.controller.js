require('dotenv').config();
const nodemailer = require('nodemailer');
const validation = require('./validation');
const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

exports.apiTest = (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 20%;">
      <p style="font-size: 1.5rem;">You just hit the dopest API on the block </p>
    </div>
  `);
};

exports.contactUs = async (req, res) => {
  try {
    let { name, email, message } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Validation failed", error: "Invalid email address" });
    }

    message = sanitizeHtml(message, {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      allowedAttributes: { 'a': ['href'] }
    });

    const sanitizedName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} }).trim();
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedMessage = message;

    const { error } = validation.postSubmission({ name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        error: error.details[0]?.message.replace(/"/g, '')
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: sanitizedEmail,
      subject: 'ALERT ON YOUR PORTFOLIO WEB PAGE: New Contact Us Message',
      text: `
Contact Us Message Submission

Message from: ${sanitizedName}
Email ID: ${sanitizedEmail}
Message:
${sanitizedMessage}
      `,
      html: `
        <h2>Contact Us Message Submission</h2>
        <p><strong>Message from:</strong> ${sanitizedName}</p>
        <p><strong>Email ID:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px; color: #333;">
          ${sanitizedMessage.replace(/\n/g, "<br>")}
        </blockquote>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message has been sent successfully." });

  } catch (err) {
    console.error('Email sending error:', err);
    return res.status(500).json({ message: "Unable to process your request" });
  }
};
