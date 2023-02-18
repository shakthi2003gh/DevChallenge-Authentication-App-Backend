const router = require("express").Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUpdateInput } = require("../models/user");

router.put("/:id", async (req, res) => {
  const { error, value } = validateUpdateInput(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("User not found!");

  if (value.email && User.find({ email: value.email }))
    return res.status(400).send("User already exist with this email id");

  if (value.password) {
    const same = bcrypt.compare(value.password, user.password);
    if (same) return;

    const salt = bcrypt.genSalt(10);
    value.password = bcrypt.hash(value.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...value },
    { new: true }
  );

  res.send(_.pick(updatedUser, ["_id", "name", "email", "bio", "photo"]));
});

module.exports = router;
