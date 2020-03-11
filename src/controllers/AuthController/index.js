import MainController from '../main';
import AppToken from './AppToken';
import db from '../../models';
import { loginValidation } from '../../utils/validator';

const { User } = db;
class AuthController {
	static async signIn(req, res) {
		try {
			const error = {
				message: 'Invalid phone number or password'
			};
			const { phoneNumber, password } = req.body;
			await loginValidation.validateAsync({ phoneNumber, password });
			const user = await User.findOne({ where: { phoneNumber } });
			if (!user) {
				return res.status(400).json({ error });
			}
			const token = await AppToken.generateJWT(password, user.password, {
				id: user.id,
				role: user.role
			});
			return res.status(200).json({
				data: {
					token
				}
			});
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}

	static async currentUser(req, res) {
		try {
			const { id } = req.user;
			const data = await User.findByPk(id, {
				attributes: {
					exclude: ['password']
				}
			});
			return MainController.handleFind(res, data);
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}
}

export default AuthController;
