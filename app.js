const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

// Create express
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Middleware routes
const listItemsRoute = require('./routes/items');
app.use('/', listItemsRoute);

// Connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true },
	() => console.log("Connected to DB!")
)

// Server port
const port = process.env.port || 3000;
app.listen(port, () => console.log('Listening on port', port));