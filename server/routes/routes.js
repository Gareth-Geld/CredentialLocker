const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const OUController = require('../controllers/ou.controller');
const DIVController = require('../controllers/div.controller');
const CREDController = require('../controllers/cred.controller');

// get all Users
router.get('/getUsers', userController.getUsers);
router.post('/userLogin', userController.userLogin);
router.post('/register', userController.registerUser);
router.get('/getUserRole', userController.getUserRole);
router.post('/editUser', userController.editUser);

//Get all Operational Units
router.get('/getOU', OUController.getOU);
router.get('/getOUs', OUController.getOUs);

//Get all Divisions
router.get('/getSelectedDiv', DIVController.getSelectedDiv);
router.get('/getDivisions', DIVController.getDiv);

//Get all Credentials
router.get('/getCredentials', CREDController.getCredentials);
router.post('/addCredential', CREDController.addCredential);
router.post('/editCredential', CREDController.editCredential);


module.exports = router;