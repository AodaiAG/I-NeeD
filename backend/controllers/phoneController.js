const twilio = require('twilio');

// Twilio credentials (use environment variables in production)
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'your_account_sid'; // Replace with your actual account SID
const authToken = process.env.TWILIO_AUTH_TOKEN || 'your_auth_token'; // Replace with your actual auth token
const client = twilio(accountSid, authToken);

// In-memory store for verification codes (you can replace this with Redis or a database)
const verificationStore = {};

// Handle sending the verification code via SMS
const sendVerificationCode = async (req, res) => {
    const { phone } = req.body;

    // Generate a random 4-digit verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        // Send the SMS using Twilio
        const message = await client.messages.create({
            body: `Your verification code is ${verificationCode}`,
            from: '+1234567890', // Twilio phone number (replace with your Twilio number)
            to: phone
        });

        console.log(`Verification code sent: ${message.sid}`);

        // Store the verification code in-memory for now (replace this with actual storage)
        verificationStore[phone] = verificationCode;

        res.json({ success: true, message: 'Verification code sent', verificationCode }); // Optionally include code for demo purposes
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send verification code' });
    }
};

// Handle verifying the code
const verifyCode = (req, res) => {
    const { phone, verificationCode } = req.body;

    // Check if the verification code matches the one we sent
    if (verificationStore[phone] === verificationCode) {
        // Remove the verification code from the store after successful verification
        delete verificationStore[phone];

        res.json({ success: true, message: 'Phone verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid verification code' });
    }
};

// Export the functions for use in the routes
module.exports = {
    sendVerificationCode,
    verifyCode
};
