const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, default: "", min: 3, max: 50 },
    password: { type: String, required: true, min: 5, max: 250 },
    bio: { type: String, default: "", min: 0, max: 500 },
    email: { type: String, required: true, unique: true, max: 100 },
    photo: String,
  })
);

function validateInput(input) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5).max(50),
  });

  return schema.validate(input);
}

function validateUpdateInput(input) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    password: Joi.string().min(5).max(50),
    bio: Joi.string().max(500),
    email: Joi.string().email().max(100),
    photo: Joi.string(),
  });

  return schema.validate(input);
}

module.exports.User = User;
module.exports.validate = validateInput;
module.exports.validateUpdateInput = validateUpdateInput;
