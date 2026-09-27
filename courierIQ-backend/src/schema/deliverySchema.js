import Joi from "joi";

export const deliverySchema = Joi.object({
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
  courier: Joi.string().min(2).required().messages({
    "string.empty": "You must select a courier",
    "string.min": "Courier name is invalid",
    "any.required": "Please select a courier to book the delivery",
  }),
});
