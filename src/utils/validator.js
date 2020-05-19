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
  password: Joi.string(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number")
    .required(),
  role: Joi.string().valid("admin", "supervisor", "agent"),
  address: Joi.string(),
  name: Joi.string(),
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
  address: Joi.string(),
  password: Joi.string().min(6)
});

export const companyUpdateValidator = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number"),
  email: Joi.string().email(),
  address: Joi.string()
});

export const validateSales = Joi.object({
  clientName: Joi.string().required(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number")
    .required(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  sector: Joi.string().required(),
  cell: Joi.string().required(),
  village: Joi.string().required(),
  companyId: Joi.string().required(),
  sex: Joi.string().valid("male", "female"),
  age: Joi.number().required(),
  editable: Joi.boolean(),
  clientID: Joi.string()
    .min(16)
    .max(16)
});
export const validateSalesUpdate = Joi.object({
  clientName: Joi.string(),
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number"),
  province: Joi.string(),
  district: Joi.string(),
  sector: Joi.string(),
  cell: Joi.string(),
  village: Joi.string(),
  companyId: Joi.string(),
  sex: Joi.string().valid("male", "female"),
  age: Joi.number(),
  editable: Joi.boolean(),
  clientID: Joi.string()
    .min(16)
    .max(16)
});
export const validatePassword = Joi.object({
  password: Joi.string()
    .min(6)
    .max(15)
    .required(),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref("password"))
    .error(new Error("Passwords do not match"))
    .required()
});

export const validatePhone = Joi.object({
  phoneNumber: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .message("Invalid phone number")
    .required()
});
