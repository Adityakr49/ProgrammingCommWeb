const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  try {
    const { email, name, password, role, secretPin } = req.body;

    // Check if the provided role is valid
    // const validRoles = ["user", "admin"];
    // if (!validRoles.includes(role)) {
    //   throw new CustomError.BadRequestError("Invalid user role");
    // }

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists");
    }
    // If the role is 'admin', check the secret pin
    if (role === "admin" && secretPin !== process.env.MEMBER_ID) {
      throw new CustomError.UnauthorizedError("Invalid Member Id");
    }

    const user = await User.create({ name, email, password, role });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (error) {
    // Handle and log the error appropriately
    console.error("Error in registration:", error.message);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password, role, secretPin } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  if (tokenUser.role === "admin" && secretPin !== process.env.MEMBER_ID) {
    throw new CustomError.UnauthorizedError("Email register as core member please provide Member Id");
  }
  if (role === "admin" && secretPin !== process.env.MEMBER_ID) {
    throw new CustomError.UnauthorizedError("Invalid Member Id");
  }
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
