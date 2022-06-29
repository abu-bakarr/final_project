const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ msg: 'Not Authorizie' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid Token sent' });
  }
};
