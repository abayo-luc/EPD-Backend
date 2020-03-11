/* eslint-disable no-useless-escape */
import Joi from "@hapi/joi";

export const loginValidation = Joi.object({
  phoneNumber: Joi.string()
    // eslint-disable-next-line no-useless-escape
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .message("Invalid phone number")
    .required(),
  password: Joi.string().required("Password is required")
});

export const signUpValidator = Joi.object({
  username: Joi.string()
    .max(15)
    .min(3)
    .required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number")
    .required(),
  role: Joi.string().valid("admin", "supervisor", "agent"),
  companyId: Joi.string().when("role", {
    is: "supervisor",
    then: Joi.string()
      .guid({
        version: ["uuidv4", "uuidv5"]
      })
      .required()
  })
}).options({ abortEarly: false });

export const userUpdateValidator = Joi.object({
  username: Joi.string()
    .max(30)
    .min(3),
  email: Joi.string().email(),
  name: Joi.string()
});

export const companyValidator = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number")
    .required(),
  email: Joi.string()
    .email()
    .required(),
  address: Joi.string()
});

export const companyUpdateValidator = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number"),
  email: Joi.string().email(),
  address: Joi.string()
});
