import express from 'express';
import cors from 'cors';
import routers from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routers);
app.get('/', (_req, res) => {
	return res.status(200).json({
		message: 'Welcome to EDP endpoint'
	});
});
app.use('*', (req, res) =>
	res.status(404).json({
		message: 'API endpoint not found!'
	})
);
export default app;
