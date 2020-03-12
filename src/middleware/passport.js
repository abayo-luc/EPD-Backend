import dotenv from 'dotenv';
import { Strategy, ExtractJwt } from 'passport-jwt';
import db from '../models';

dotenv.config();
const { JWT_SECRET_KEY } = process.env;
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SECRET_KEY;

export default new Strategy(options, async (payload, done) => {
	const { id } = payload;
	try {
		const user = await db.User.findByPk(id);
		if (!user) {
			return done('User not authenticated', false);
		}
		user.password = undefined;
		return done(null, user);
	} catch (error) {
		return done(error, false);
	}
});
