const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

// Get profile of the logged-in user
const profileController = async (req, res) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findById(userData._id).select("-password"); // exclude password
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    });
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update profile of the logged-in user
const profileUpdate = async (req, res) => {
  try {
    const token = req.cookies?.authToken;
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      const { firstName, lastName, email, avatarLink } = req.body;

      // Fetch user by JWT ID, not email (more secure)
      const user = await User.findById(userData._id);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Update user fields
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (avatarLink) user.avatarLink = avatarLink;

      await user.save();
      res.json({ message: "Profile updated successfully", user });
    });
  } catch (error) {
    console.error("Error in profileUpdate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { profileController, profileUpdate };
