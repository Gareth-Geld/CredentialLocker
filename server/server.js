const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(helmet());

// Import the connectDB function from database.js
const connectDB = require('./config/database');

const userRoutes = require("./routes/routes");
app.use('/', userRoutes);

async function start() {
    // Call the connectDB function to establish the database connection
    await connectDB();

    app.listen(port, () => console.log('Listening engaged'));
}

start();