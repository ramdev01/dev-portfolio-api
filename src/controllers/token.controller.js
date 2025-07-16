require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.tokenGenerate = (req, res) => {
  try {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
      return res.status(500).json({ message: 'Secret key not configured' });
    }

    const token = jwt.sign(
      { role: 'public' }, 
      SECRET_KEY
    );

    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
