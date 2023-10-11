const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const CredModel = require('../models/CredentialsModel');

// Get All Data for table
exports.getCredentials = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        const division = req.query.division;
        const ou = req.query.ou;

        // Check if 'division' and 'ou' are included in their respective selected arrays
        const selectedDivisions = decoded.selectedDivisions;
        const selectedOUs = decoded.selectedOUs;

        // Create an array to store the extracted division names
        const divisions = selectedDivisions.map(division => {
            const parts = division.split('-');
            return parts.length > 1 ? parts[1] : division;
        });

        if (selectedOUs.includes(ou) && divisions.includes(division)) {
            try {
                // Use the Mongoose model to fetch data from the "JobList" collection
                const CredList = await CredModel.find({ division: division, ou: ou });

                // Send the data as a JSON response
                res.json(CredList);
            } catch (error) {
                console.error('Error fetching User data:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            // If 'division' or 'ou' is not included in selected arrays, return a response indicating permission denied.
            res.status(403).json({ error: 'Permission denied' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};

// Add Credential controller
exports.addCredential = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.role === 'normal' || decoded.role === 'management' || decoded.role === 'admin') {
            try {
                // Extract the credential data from the request body
                const { username, password, type, division, ou } = req.body;

                // Create a new Credential document
                const newCredential = new CredModel({
                    division,
                    ou,
                    username,
                    password,
                    type,
                });

                // Save the new Credential to the database
                const savedCredential = await newCredential.save();

                res.json(savedCredential);
            } catch (error) {
                console.error('Error adding Credential:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            // If 'division' or 'ou' is not included in selected arrays, return a response indicating permission denied.
            res.status(403).json({ error: 'Permission denied' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }

};

// Edit Credential controller
exports.editCredential = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.role === 'management' || decoded.role === 'admin') {
            try {
                // Extract the credential data from the request body, including the unique credential ID
                const { _id, username, password, type, division, ou } = req.body;

                // Check if the credential with the provided ID exists
                const existingCredential = await CredModel.findById(_id);

                if (!existingCredential) {
                    return res.status(404).json({ error: 'Credential not found' });
                }

                // Update the existing credential with the new data
                existingCredential.username = username;
                existingCredential.password = password;
                existingCredential.type = type;
                existingCredential.division = division;
                existingCredential.ou = ou;

                // Save the updated credential to the database
                const updatedCredential = await existingCredential.save();

                res.json(updatedCredential);
            } catch (error) {
                console.error('Error editing Credential:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            // If 'division' or 'ou' is not included in selected arrays, return a response indicating permission denied.
            res.status(403).json({ error: 'Permission denied' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};