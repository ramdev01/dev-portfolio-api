const express = require('express');
const router = express.Router();

const formController = require('../controllers/form.controller');
const authenticateToken = require('../middlewares/auth.middleware'); 

router.get('/api-test', formController.apiTest); //  
router.post('/contact-us', authenticateToken, formController.contactUs)
module.exports = router;
