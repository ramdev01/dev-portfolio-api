// middlewares/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 40 * 1000,  
  max: 10,  
  message: {
    status: 429,
    message: "Too many requests, please try again after a minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
