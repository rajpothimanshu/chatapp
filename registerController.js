const bcrypt = require("bcrypt");
const { User, validateRegister } = require("../models/userModel");
const { Token } = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const registerController = async (req, res) => {
  try {
    // Validate incoming request
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });

    if (user && user.verified) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }

    if (user && user.verificationLinkSent) {
      return res.status(400).send({
        message: "A verification link has already been sent to this email. Please check your inbox.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Save new user
    user = new User({
      ...req.body,
      password: hashPassword,
    });
    await user.save();

    // Create verification token
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour
    }).save();

    // Verification URL
    // const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    const url = `${process.env.SERVER_URL}/api/user/${user._id}/verify/${token.token}`;


    // Send verification email
    await sendEmail(user.email, "Verify Email", url);

    user.verificationLinkSent = true;
    await user.save();

    res.status(201).send({
      message: `Verification Email sent to ${user.email}`,
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = registerController;
