import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const JWT_SECRET = process.env.JWT_SECRET;

//Find more persistent storage for this
const tokenBlacklist = new Set();

const signout = (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
      const err = new Error('Missing token');
      err.status = 401;
      throw err;
    }

    if (token && tokenBlacklist.has(token)) {
      const err = new Error('Token already invalidated');
      err.status = 401;
      throw err;
    }

    tokenBlacklist.add(token);
    res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    next(error);
  }
};
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new Error('Missing email or password');
      err.status = 400;
      throw err;
    }

    const user = await User.findOne({ email: email });

    if (!user || user.password !== password) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ sub: user._id.toString() }, JWT_SECRET);
    res.json({ token, id: user.id, admin: user.admin });
  } catch (error) {
    next(error);
  }
};
export default { signin, signout };
