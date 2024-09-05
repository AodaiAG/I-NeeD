const Item = require('../models/itemModel'); // Import the Item model

// Controller function for handling search
const search = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    try {
        // Search the Item model using Sequelize's `findAll` method
        const results = await Item.findAll({
            where: {
                // Use Sequelize's LIKE operator for partial matching
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.like]: `%${query}%` } },
                    { description: { [Sequelize.Op.like]: `%${query}%` } }
                ]
            },
            limit: 10 // Limit results to 10
        });

        if (results.length > 0) {
            return res.json({ success: true, results });
        } else {
            return res.json({ success: true, message: 'No results found', results: [] });
        }
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ success: false, message: 'Error performing search' });
    }
};

module.exports = {
    search
};
