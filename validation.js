const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(30)
    .required(),
  description: Joi.string()
    .max(255)
    .required(),
  price: Joi.string()
    .required(),
  size: Joi.array()
    .required(),
  categoryId: Joi.string()
    .required(),
  imageLink: Joi.string()
    .required()
});

const categorySchema = Joi.object({
  name: Joi.string()
    .required(),
  audience: Joi.string()
    .required()
});

const userSchema = Joi.object({
  username: Joi.string().alphanum().trim().min(5).max(50).required(),
  email: Joi.string().required().email(),
  password: Joi.string().trim().min(8).max(50).required()
});

module.exports = { productSchema, categorySchema, userSchema };
