const express = require('express')
const router = express.Router()
const ListItem = require('../models/ListItem')

// Get all to do items
router.get('/', async (req, res) => {
	try {
		const items = await ListItem.find();

		// Send to screen
		res.json(items);
	} catch (error) {
		res.json({ message: error });
	}
})

// Post new to do item
router.post('/', async (req, res) => {
	const item = new ListItem({...req.body});

	try {
		const savedItem = await item.save();

		// Send to screen
		res.json(savedItem);
	} catch (error) {
		res.json({ message: error })
	}
})

module.exports = router;