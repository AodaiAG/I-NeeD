const twilio = require('twilio');

const client = twilio(accountSid, authToken);

const sendVerificationCode = async (phone, verificationCode) => {
    try {
        await client.messages.create({
            body: `Your verification code is ${verificationCode}`,
            from: '+1234567890', // Replace with your Twilio number
            to: phone
        });

        console.log(`Verification code sent to ${phone}`);
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error; // Rethrow error to be handled by the route
    }
};

module.exports = {
    sendVerificationCode
};
