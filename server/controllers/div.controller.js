const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const DivModel = require('../models/DivisionModel');
//Gets selected Divs from User Param
exports.getSelectedDiv = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-secret');
        const divisionType = req.query.divisionType;
        try {
            // Get the list of selected divisions
            const selectedDivisions = decoded.selectedDivisions;

            // Create a map to group divisions by their associated OUs
            const divisionsByOU = {};

            // Split selected divisions into OU and division parts and group them
            selectedDivisions.forEach((selectedDivision) => {
                const [ou, division] = selectedDivision.split('-');
                if (!divisionsByOU[ou]) {
                    divisionsByOU[ou] = [];
                }
                divisionsByOU[ou].push(division);
            });

            // Fetch available divisions for the specified OU
            const DivList = divisionsByOU[divisionType] || [];

            res.json(DivList);
        } catch (error) {
            console.error('Error fetching DIV data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};



// Get All Data for table
exports.getDiv = async (req, res) => {
    try {
        const divisionType = req.query.divisionType;
        try {
            const DivList = await DivModel.find({ ou: divisionType });
            res.json(DivList);
        } catch (error) {
            console.error('Error fetching DIV data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' });
    }
};


