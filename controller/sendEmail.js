// Import required modules
const nodemailer = require("nodemailer");

// Create transporter using SMTP or other transport mechanisms
const transporter = nodemailer.createTransport({
  // service: "YourEmailServiceProvider", // e.g., 'Gmail'
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // user: "zaidkhan1681@gmail.com",
    user: "projecthub63@gmail.com",
    pass: "ugbr wmrc wkwv krtq",
  },
});

// Function to send email
async function sendEmail(toEmail) {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: "projecthub63@gmail.com", // sender address
      to: toEmail, // list of receivers
      subject: "Login Notification", // Subject line
      text: "Congratulations!! You have successfully registered to the Project Hub : Collaborative platform , Now you can login !.", // plain text body
    });

    console.log("Email sent: " + info.response);
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return false; // Failed to send email
  }
}

// Export the sendEmail function to be used in other files
module.exports = { sendEmail };
