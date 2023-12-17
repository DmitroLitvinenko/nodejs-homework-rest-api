const jwt = require("jsonwebtoken");

const User = require("../models/users");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    try {
      const user = await User.findById(decode.id).exec();

      if (!user) {
        return res.status(401).send({ message: "Invalid token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.user = { id: user.id, name: user.name }

      next();
    } catch (error) {
      next(error);
    }
  });
}

module.exports = auth;
