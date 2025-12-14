import jwt from "jsonwebtoken";

export const userloginController = async (req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            token,
            message: "user logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "server error ",
            error: error.message,
        });
    }
};
