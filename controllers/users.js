const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/user/login
 * @desc Login
 * @access Public
 */

/* checking the user in the database */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in the required fields" });
  }
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // name: test
  // email: test@test.de
  // password: 123123 = $2b$10$xc67vuz4UbqCIoTzLmwaQOOHM.0p6VBh6Aim7xr95PPz4m/8JPBGe
  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password));
  // encoded string to generate token
  const secret = process.env.JWT_SECRET;

  // checking user password
  if (user && isPasswordCorrect && secret) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }), // token hashes only ID
    });
  } else {
    return res.status(400).json({ message: "incorrect login or password" });
  }
};

/**
 *
 * @route POST /api/user/register
 * @desc Registration
 * @access Public
 */

/* users registration */
const register = async (req, res) => {
  const { email, password, name } = req.body;
  //error checking
  if (!email || !password || !name) {
    return res
      .send(400)
      .json({ message: "Please fill in the required fields" });
  }

  //check if such a user already exists in the database
  const registeredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (registeredUser) {
    return res
      .status(400)
      .json({ message: "user with this email already exists" });
  }

  /* password encryption */
  //a string that is added to the hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating a user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  /* issuing a token */
  const secret = process.env.JWT_SECRET;

  if (user && secret) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }), // the token (ID) will expire after 30 days
    });
  } else {
    return res.status(400).json({ message: "failed to create user" });
  }
};
const current = async (req, res) => {
  res.send("current");
};

module.exports = {
  login,
  register,
  current,
};
