const express = require('express');
const router = express.Router();

const tokenController = require('../controllers/token.controller');

router.get('/secret@qlskdjqpwo', tokenController.tokenGenerate); //  
module.exports = router;
