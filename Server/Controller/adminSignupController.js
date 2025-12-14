import Admin from "../Model/AdminModel.js";
import bcrypt from "bcryptjs";
import config from "../Configuration/config.js";

export const adminSignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    
    const newAdmin = new Admin({
      username: username,
      email: email,
      password: hashpass,
      role: "admin",
    });

    await newAdmin.save();

    
    res.status(201).json({
      message: "Successfully signed up as admin",
      id: newAdmin._id,
      email: newAdmin.email,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
