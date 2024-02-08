import User from '../models/User.js';
import bycrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

export const register = async (req, res, next) => {
  try {
    const salt = bycrypt.genSaltSync(10);
    const hash = bycrypt.hashSync(req.body.password, salt);

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
    const user = await User.findOne(req.body.username);
    if (!user) {
      return createError(404, 'User not found');
    }

    const isPasswordCorrect = await bycrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return createError(404, 'Password incorrect');
    }

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
