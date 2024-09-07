const express = require('express');
const router = express.Router();
const JobType = require('../models/jobTypeModel'); // Import your Sequelize model

const locationController = require('../controllers/locationController');
// Import controllers
const { sendVerificationCode, verifyCode } = require('../controllers/phoneController');
const { search } = require('../controllers/searchController');
const { userControllerFunction } = require('../controllers/userController'); // Example for users, if needed

// Define routes

// Search route
router.get('/search', search);

// Route to get reverse geocode (address from lat/lon)
router.get('/geocode', locationController.getGeocode);

// Route to get autocomplete suggestions
router.get('/autocomplete', locationController.getAutocomplete);

// Store Location Route
//router.post('/store-location', locationController.storeLocation);
// Phone verification routes
router.post('/phone/verify', sendVerificationCode);     // Send verification code
router.post('/phone/verify-code', verifyCode);          // Verify the code

router.get('/main-professions', async (req, res) => {
    try {
        const mainProfessions = await JobType.findAll({
            attributes: ['main'],  // Fetch only 'main' column
            group: ['main']        // Group by 'main' to ensure distinct values
        });
        res.json(mainProfessions);
    } catch (error) {
        console.error('Failed to fetch main professions:', error);
        res.status(500).json({ error: 'Failed to fetch main professions' });
    }
});

router.get('/sub-professions/:main', async (req, res) => {
    const mainCategory = req.params.main;
    try {
        const subProfessions = await JobType.findAll({
            where: { main: mainCategory },  // Fetch sub professions where main = selected main
            attributes: ['sub']             // Only fetch 'sub' column
        });
        res.json(subProfessions);
    } catch (error) {
        console.error('Failed to fetch sub professions:', error);
        res.status(500).json({ error: 'Failed to fetch sub professions' });
    }
});
module.exports = router;
