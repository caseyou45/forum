const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: savedUser.username, name: savedUser.name });
  // response.json(savedUser);
});

usersRouter.get("/:id", async (request, response) => {
  const users = await User.findById(request.params.id).populate("notes", {
    content: 1,
    date: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
