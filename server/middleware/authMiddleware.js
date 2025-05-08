import jwt from 'jsonwebtoken';
import User from '../models/User.js';

 
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    console.log("hello1");
    const decoded = jwt.verify(token, '8hy98h9yu89y98yn89y98y89');
    console.log("hello2");
    req.user = await User.findById(decoded.id).select('-password');
    console.log("sucessfully aunthicated");
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

 
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
