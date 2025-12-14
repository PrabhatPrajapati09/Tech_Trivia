import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";

export const userSignupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashpass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashpass,
            role: "user"
        });

        await newUser.save();

        res.status(201).json({
            message: "successfully signed up as user",
            id: newUser.id,
            email: newUser.email,
        });

    } catch (error) {
        res.status(500).json({
            message: "server error ",
            error: error.message
        });
    }
};
