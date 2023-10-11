const mongoose = require('mongoose');

// Define the MongoDB connection URI
const mongoURI = 'mongodb+srv://gazza:Lemmens@hyperdevserver.10opjsf.mongodb.net/Cool-Tech?retryWrites=true&w=majority';

// Configure and establish the MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;