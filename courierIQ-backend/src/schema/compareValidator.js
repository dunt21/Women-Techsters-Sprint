import Joi from "joi";

export const CompareSchema = Joi.object({
  pickup: Joi.string().min(2).required().messages({
    "string.empty": "Pickup location cannot be empty",
    "string.min": "Pickup location must be at least 2 characters",
    "any.required": "Please provide a pickup location",
  }),
  dropOff: Joi.string().min(2).required().messages({
    "string.empty": "Drop-off location cannot be empty",
    "string.min": "Drop-off location must be at least 2 characters",
    "any.required": "Please provide a drop-off location",
  }),
});
