import bcrypt from "bcryptjs";
import Admin from "../Model/AdminModel.js";

export const adminLoginAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    console.log(existingAdmin)

    if (!existingAdmin) {
      return res.status(400).json({ message: "email is not registered" });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    req.user = existingAdmin;

    next();

  } catch (error) {

    res.status(500).json({
      message: "server error",
      error: error.message,

    });
  }
};
