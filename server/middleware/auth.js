import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;

        const user = await User.findById(req.userId);
        req.userRole = user.role;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthenticated" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: "Access forbidden: Admins only" });
    }
    next();
};

export { auth, isAdmin };