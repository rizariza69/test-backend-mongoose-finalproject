const user = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = {
  isAuthenticated: async (req, res, next) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) return res.send(`token not found`);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const users = await user.findOne({ id: decoded.id });

      if (users === null) return res.send(`User not found`);

      req.decoded = decoded;
      next();
    } catch (error) {
      res.status(500).send({
        message: `error`
      });
    }
  }
};
