import jwt from 'jsonwebtoken';
import { UserModel } from '../model/User.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.error('Error decoding token:', err);
        return res.status(401).json({ message: 'Invalid token.' });
      }

      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found.' });
      }

      req.userId = decoded.userId;  // Set userId directly from the token
      next();
    });
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export { authMiddleware };
