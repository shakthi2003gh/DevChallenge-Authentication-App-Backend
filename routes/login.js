const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(404).send("Invalid email or password");

  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(_.pick(user, ["_id", "name", "email", "bio", "photo"]));
});

module.exports = router;
