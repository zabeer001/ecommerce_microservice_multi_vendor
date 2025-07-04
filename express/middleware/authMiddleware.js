import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env.js';
import { tokenBlacklist } from '../helpers/tokenBlacklist.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    if (await tokenBlacklist.has(token)) {
      return res.status(401).json({ message: 'Token is no-longer usable , just got invalid. Please log in again.' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
