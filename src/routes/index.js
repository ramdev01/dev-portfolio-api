const express = require('express');
const router = express.Router();

const formRoutes = require('./form.routes');

router.use('/form', formRoutes); 

module.exports = router;
