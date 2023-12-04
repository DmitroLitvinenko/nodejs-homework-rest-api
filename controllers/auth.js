const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" })

      newUser.token = token;
      await newUser.save();

    return res.status(201).send({
      user: { email: newUser.email, subscription: newUser.subscription }, token,
    });

    

  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).send({ message: "Email or password is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Email or password is invalid" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }).exec();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout };
