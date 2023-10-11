const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const UserModel = require('../models/UserModel');

// Get All Data for table
exports.getUsers = async (req, res) => {

    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.role === 'admin') {
            try {
                // Use the Mongoose model to fetch data from the "JobList" collection
                const UserList = await UserModel.find();

                // Send the data as a JSON response
                res.json(UserList);
            } catch (error) {
                console.error('Error fetching User data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};

// loginUser
exports.userLogin = async (req, res) => {
    const usr = req.body.username;
    const pwd = req.body.password;
    try {
        // Use the Mongoose model to fetch data from the "JobList" collection
        const user = await UserModel.findOne({ username: usr });
        if (user && pwd === user.password) {
            // if (pwd === user.password) {
            const payload = {
                'name': usr,
                'role': user.role,
                'selectedOUs': user.selectedOUs,
                'selectedDivisions': user.selectedDivisions,
            };
            const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
            res.send({ 'token': token });
            // }
        } else {
            res.status(403).send({ 'err': 'Incorrect login!' });
        }

    } catch (error) {
        console.error('Error fetching User data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new user
exports.registerUser = async (req, res) => {
    try {
        // Get user data from the request body
        const { username, password, selectedOUs, selectedDivisions } = req.body;

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user instance
        const newUser = new UserModel({
            username,
            password,
            selectedOUs,
            selectedDivisions,
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user role for table
exports.getUserRole = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        // Send the user's role as a JSON response
        res.json({ role: decoded.role });
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};

// Edit a user
exports.editUser = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.role === 'admin') {
            try {
                // Get user data from the request body
                const { _id, username, role, selectedOUs, selectedDivisions } = req.body;

                // Find the user by their _id
                const existingUser = await UserModel.findOne({ _id });

                if (!existingUser) {
                    return res.status(404).json({ error: 'User not found' });
                }

                // Update the user's information
                existingUser.username = username;
                existingUser.role = role;
                existingUser.selectedOUs = selectedOUs;
                existingUser.selectedDivisions = selectedDivisions;

                // Save the updated user to the database
                await existingUser.save();

                // Send a success response
                res.status(200).json({ message: 'User updated successfully' });
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            res.status(403).send({ 'err': 'Unauthorized Access' });
        }
    } catch (error) {
        console.error('Error fetching User data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


