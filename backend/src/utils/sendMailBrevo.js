const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    auth: {
        user: 'divyank.vyas.dev@gmail.com',
        pass: 'IM18BTxFyv4wKAP9'
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