const userSchema = require("../Schema/schema");
// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const httpStatusCodes = require("../../httpStatusCodes.json");

const User = require("../Schema/schema");

// Save user's selected theme to the database
exports.setTheme = async (req, res, next) => {
  try {
    const { email, userId } = res.locals.userData;
    const query = { email: email };
    const body = req.body;
    const data = { theme: body.theme };
    let response = await User.findOneAndUpdate(query, data, { upsert: false });
    if (response)
      res
        .status(httpStatusCodes.OK.statusCode)
        .json("Theme saved successfully.");
  } catch (err) {
    if (err)
      return res
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR.statusCode)
        .json({ error: err });
  }
};

// Fetch the user's profile data
exports.userProfile = (req, res, next) => {
  const { userId, email } = res.locals.userData;
  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(httpStatusCodes.OK.statusCode).json(user);
      } else {
        return res
          .status(httpStatusCodes.NOT_FOUND.statusCode)
          .json({ message: "User not found!" });
      }
    })
    .catch((err) => {
      return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR.statusCode).json({
        message: "Fetching user failed!",
      });
    });
};

// Create a new user in the database
exports.createUser = async (req, res, next) => {
  try {
    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new userSchema({
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();

    res.status(httpStatusCodes.CREATED.statusCode).json({
      message: httpStatusCodes.CREATED.message,
      result: result,
    });
  } catch (err) {
    console.error("Error while creating user:", err);
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR.statusCode).json({
      message: httpStatusCodes.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

// Handle user login and generate JWT token
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verify that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const fetchedUser = await User.findOne({ email });

    // Check if user with the provided email exists
    if (!fetchedUser) {
      return res.status(401).json({
        message: "Authentication failed. User not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      fetchedUser.password
    );
    // Check if the passwords match
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Authentication failed. Invalid password.",
      });
    }

    // If passwords match, generate a JWT token and send it in the response
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser.id },
      "secretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser.id,
      theme: fetchedUser.theme,
    });
  } catch (err) {
    console.error("Error while logging in:", err);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
