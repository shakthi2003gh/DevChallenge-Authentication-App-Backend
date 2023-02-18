const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const userExist = await User.findOne({ email: value.email });
  if (userExist) return res.status(404).send("User already register");

  const salt = await bcrypt.genSalt(10);
  value.password = await bcrypt.hash(value.password, salt);

  const user = new User({
    email: value.email,
    password: value.password,
  });

  await user.save();
  res.send(_.pick(user, ["_id", "name", "email", "bio", "photo"]));
});

module.exports = router;
