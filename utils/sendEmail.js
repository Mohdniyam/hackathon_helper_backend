const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

console.log("📧 Setting up email transporter with host:", process.env.SMTP_HOST);

const emailConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true', // ✅ Fix: convert string to boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
};

console.log("📧 Email configuration:", emailConfig);



// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection (optional but helpful)
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready to send emails!");
  }
});

async function sendEmail(to, subject, body, from = null) {
    console.log("Preparing to send email:", { to, subject, from });
  try {
    const mailOptions = {
      from: "Secure Escrow <haqn0364@gmail.com>",
      to: to,
      subject: subject,
      html: body
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', result.messageId);
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send email'
    };
  }
}
async function teamInvitationEmail(to, teamName, inviteLink, from = null) {
  const subject = `Invitation to join team: ${teamName}`;
  const body = `
    <h1>You're Invited to Join ${teamName}!</h1>
    <p>Hello,</p>
    <p>You have been invited to join the team <strong>${teamName}</strong>.</p>
    <p>Click the link below to accept the invitation and join the team:</p>
    <a href="${inviteLink}">Join ${teamName}</a>
    <p>If you did not expect this invitation, please ignore this email.</p>
    <br/>
    <p>Best regards,<br/>Secure-Escrow Team</p>
  `;

  return await sendEmail(to, subject, body, from);
}

// ✅ FIX: CommonJS export
module.exports = {
  sendEmail,
  teamInvitationEmail
};