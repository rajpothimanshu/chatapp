const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    // Validate login input
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Check password validity
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Check if the user has verified their email
    if (!user.verified) {
      return res.status(400).send({ message: "Please verify your email before logging in" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send token as an HTTP-only cookie
    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true, // should be true for security
        sameSite: "none",
        secure: true, // set true when using HTTPS
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })
      .send({
        message: "Login successful",
        status: 200,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = loginController;
