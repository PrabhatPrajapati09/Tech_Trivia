import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(403).json({ message: "Not authorized" });

        req.user = user;
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
