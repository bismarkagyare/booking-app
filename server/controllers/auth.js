import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      return createError(404, 'User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return createError(404, 'Password incorrect');
    }

    const { password, isAdmin, ...otherDetails } = foundUser;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
