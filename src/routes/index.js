const express = require('express');
const router = express.Router();

const formRoutes = require('./form.routes');
const tokenRoutes = require('./accessToken.route.js')
router.use('/form', formRoutes); 
router.use('/access-token', tokenRoutes); 

module.exports = router;
