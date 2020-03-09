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
		.required(),
	role: Joi.string().valid('admin', 'supervisor', 'agent'),
	companyId: Joi.string().when('role', {
		is: 'supervisor',
		then: Joi.string()
			.guid({
				version: ['uuidv4', 'uuidv5']
			})
			.required()
	})
});

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
		.regex(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
		.message('Invalid phone number')
		.required(),
	email: Joi.string()
		.email()
		.required(),
	address: Joi.string()
});

export const companyUpdateValidator = Joi.object({
	name: Joi.string(),
	phoneNumber: Joi.string()
		.regex(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
		.message('Invalid phone number'),
	email: Joi.string().email(),
	address: Joi.string()
});
