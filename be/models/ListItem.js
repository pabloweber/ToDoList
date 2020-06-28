const mongoose = require('mongoose')

// Define schema for each list item
const ListItemSchema = mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	finished: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('ListItem', ListItemSchema);