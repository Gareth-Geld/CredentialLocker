const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const OUModel = require('../models/OuModel');

// Get All Data for table
exports.getOU = async (req, res) => {
    try {
        try {
            const OUList = await OUModel.find();
            res.json(OUList);
        } catch (error) {
            console.error('Error fetching OU data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};

// Get All Data for table
exports.getOUs = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        try {
            const OUList = await OUModel.find();
            // Filter the OUList to only include OUs that are in selectedOUs
            const selectedOUs = decoded.selectedOUs;
            const filteredOUs = OUList.filter((ou) => selectedOUs.includes(ou.Name));
            res.json(filteredOUs);
        } catch (error) {
            console.error('Error fetching OU data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};
