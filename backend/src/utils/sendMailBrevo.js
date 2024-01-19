const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    auth: {
        user: 'divyank.vyas.dev@gmail.com',
        pass: 'xsmtpsib-f6c745f6f97e60aada30ae8835b9f57adee220c4d3b0c35e85632cc3534555e8-EqORhaBFbnfGvmrT'
    },
    secure: false // Use 'true' for TLS-secured connection
});

// Function to send the email
async function sendEmail(recipient, subject, content) {
    try {
        await transporter.sendMail({
            from: 'divyank.vyas.dev@gmail.com',
            to: recipient,
            subject: subject,
            text: content
        });
        console.log(recipient);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;