import User from "../Model/UserModel.js";

export const userSignupAuth = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "email is already registered" });
        }

        next();

    } catch (error) {
        res.status(500).json({
            message: "Server error...",
            error: error.message
        });
    }
};
