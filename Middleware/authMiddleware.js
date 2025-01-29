const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).send({ error: "No token" });
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    console.log(req.user);

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = authMiddleware;
