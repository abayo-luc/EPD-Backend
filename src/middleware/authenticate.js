import passport from 'passport';
import { isEmpty } from 'lodash';

export default (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (err, user, _info) => {
		if (err || !user || isEmpty(user)) {
			return res.status(401).json({ error: 'User not authorized' });
		}
		req.user = user;
		return next();
	})(req, res, next);
};
