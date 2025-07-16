const express = require('express');
const router = express.Router();

const formController = require('../controllers/form.controller');

router.get('/api-test', formController.apiTest); //  

module.exports = router;
