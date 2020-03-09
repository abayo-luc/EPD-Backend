import Joi from '@hapi/joi';
export const loginValidation = Joi.object({
	phoneNumber: Joi.string()
		.regex(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
		.message('Invalid phone number')
		.required(),
	password: Joi.string().required('Password is required')
});

export const signUpValidator = Joi.object({
	username: Joi.string()
		.max(30)
		.min(3)
		.required(),
	password: Joi.string().required(),
	phoneNumber: Joi.string()
		.regex(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
		.message('Invalid phone number')
		.required()
});

export const userUpdateValidator = Joi.object({
	username: Joi.string()
		.max(30)
		.min(3),
	email: Joi.string().email(),
	name: Joi.string()
});
