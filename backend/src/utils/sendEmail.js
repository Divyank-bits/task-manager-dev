const nodemailer = require('nodemailer');

const sendPasswordChangeEmail = async (userEmail) => {
  // Create a nodemailer transporter using your email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divyank.vyas.dev@gmail.com',
      pass: 'ugxh qjzw irlf yqdr',
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: 'Password Change Notification',
    text: 'Your password has been changed successfully.',
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports =  sendPasswordChangeEmail;
// Example usage after changing the password
// Replace 'user@example.com' with the actual email address of the user

