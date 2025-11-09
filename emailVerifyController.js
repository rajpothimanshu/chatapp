const { User } = require("../models/userModel");
const { Token } = require("../models/tokenModel");

const verifyEmail = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }

    // If already verified
    if (user.verified) {
      return res.status(400).send({ message: "Email already verified" });
    }

    // Find verification token
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).send({ message: "Invalid verification link" });
    }

    // Check if token has expired
    if (token.expiresAt < Date.now()) {
      user.verificationLinkSent = false;
      await user.save();
      await Token.deleteOne({ _id: token._id }); // Clean up expired token
      return res.status(400).send({ message: "Verification link has expired. Please register again." });
    }

    // Mark user as verified
    user.verified = true;
    user.verificationLinkSent = false;
    await user.save();

    // Delete token after successful verification
    await Token.deleteOne({ _id: token._id });

    res.status(200).send({ message: "Email Verified Successfully" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = verifyEmail;
