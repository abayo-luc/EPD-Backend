import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { BCRYPT_SALT_FACTOR } = process.env;

export default user =>
	bcrypt
		.hash(user.password, parseInt(BCRYPT_SALT_FACTOR, 10))
		.then(hash => user.setDataValue('password', hash))
		.catch(err => {
			throw Error(err.message || 'Password encryption failed');
		});
