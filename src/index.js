import express from 'express';
import passport from 'passport';
import cors from 'cors';
import passportJwt from './middleware/passport';
import routers from './routes';

const app = express();
app.use(cors());
app.use(express.json());
passport.use(passportJwt);
app.use(passport.initialize());
app.use('/api', routers);
app.get('/', (_req, res) => {
	return res.status(200).json({
		message: 'Welcome to EDP endpoint'
	});
});
app.use('*', (_req, res) =>
	res.status(404).json({
		message: 'API endpoint not found!'
	})
);
export default app;
