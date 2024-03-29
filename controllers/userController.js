const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const validateEmail = require('../utils/validateEmail');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
};

//@desc Register new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  let user;

  if(!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields')
  }

  //Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists){
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  if (validateEmail(email)){
    user = await User.create({
      name,
      email,
      password: hashedPassword
    });
  }

  if(user && validateEmail(email)){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }

})

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }

});

//@desc Get user data
//@route GET /api/users/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe
}


