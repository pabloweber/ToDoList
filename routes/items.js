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
		res.json({ message: error });
	}
})

// Set item as done
router.patch('/:itemId/done', async (req, res) => {
	try {
		const updatedPost = await ListItem.updateOne(
			{ _id: req.params.itemId },
			{
				$set: {
					finished: true
				}
			}
		);

		// Send to screen
		res.json(updatedPost);
	} catch (error) {
		res.json({ message: error });
	}
})

// Set item as not done
router.patch('/:itemId/notdone', async (req, res) => {
	try {
		const updatedPost = await ListItem.updateOne(
			{ _id: req.params.itemId },
			{
				$set: {
					finished: false
				}
			}
		);

		// Send to screen
		res.json(updatedPost);
	} catch (error) {
		res.json({ message: error });
	}
})

// Delete to do item 
router.delete('/:itemId', async (req, res) => {
	try {
		const removedItem = await ListItem.deleteOne({ _id: req.params.itemId });

		// Send to screen
		res.json(removedItem);
	} catch (error) {
		res.json({ message: error });
	}
})

// Delete all items
router.delete('/deleteAll', async (req, res) => {
	try {
		await ListItem.deleteMany({}, callback);

		// Send to screen
		res.send("Deleted all items.");
	} catch (error) {
		res.json({ errorMessage: error });
	}
})

module.exports = router;