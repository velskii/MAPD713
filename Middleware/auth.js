const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'MAPD713');
    const userId = decodedToken.userId;
    // console.log(req.params.userId)
    // console.log(userId)
    if (req.params.userId != userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
};