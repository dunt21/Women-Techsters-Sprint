import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$"))
    .required()
    .messages({
      "string.pattern.base": "Please provide your full name (First and Last)",
      "string.empty": "Name cannot be empty",
      "any.required": "Please provide your name",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Please provide your email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Please provide your email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});
