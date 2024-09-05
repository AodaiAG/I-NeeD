const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');

router.post('/verify', phoneController.sendVerificationCode);
router.post('/verify-code', phoneController.verifyCode);

module.exports = router;
