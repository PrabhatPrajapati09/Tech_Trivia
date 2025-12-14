import bcrypt from "bcryptjs";
import User from "../Model/UserModel.js";

export const userLoginAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "email is not registered" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        req.user = existingUser;

        next();

    } catch (error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        });
    }
};
