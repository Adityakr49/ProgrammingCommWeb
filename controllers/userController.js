const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const register = async (req, res) => {
  res.send("ok")

  // const { email, name, password, year } = req.body;

  // const emailAlreadyExists = await User.findOne({ email });
  // if (emailAlreadyExists) {
  //   throw new CustomError.BadRequestError('Email already exists');
  // }

  // const user = await User.create({ name, email, password, year });
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("ok")

  // const { email, password } = req.body

  // if (!email || !password) {
  //   throw new BadRequestError('Please provide email and password')
  // }
  // const user = await User.findOne({ email })
  // if (!user) {
  //   throw new UnauthenticatedError('Invalid Credentials')
  // }
  // const isPasswordCorrect = await user.comparePassword(password)
  // if (!isPasswordCorrect) {
  //   throw new UnauthenticatedError('Invalid Credentials')
  // }
  // // compare password
  // const token = user.createJWT()
  // res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
};
const logout = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};