import MainController from '../main';
import db from '../../models';
import { signUpValidator, userUpdateValidator } from '../../utils/validator';
const { User } = db;
class UserController extends MainController {
	static async index(_req, res) {
		try {
			const data = await User.findAll({
				attributes: {
					exclude: ['password']
				}
			});
			return res.status(200).json({ data });
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}

	static async create(req, res) {
		try {
			const { username, password, phoneNumber } = req.body;
			await signUpValidator.validateAsync({
				username,
				password,
				phoneNumber
			});
			const data = await User.create({
				username,
				password,
				phoneNumber
			});
			data.password = undefined;
			return res.status(201).json({
				data
			});
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}

	static async find(req, res) {
		try {
			const { id } = req.params;
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

	static async update(req, res) {
		try {
			const fields = [];
			const { id } = req.params;
			await userUpdateValidator.validateAsync(req.body);
			const user = await User.findByPk(id);
			if (!user) {
				return MainController.handleFind(res);
			}
			['email', 'name', 'username'].forEach(item => {
				if (req.body[item]) user[item] = req.body[item];
				if (req.body[item]) fields.push(item);
			});
			const data = await user.save({ fields });
			data.password = undefined;
			return res.status(200).json({
				data
			});
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}

	static async updatePassword(req, res) {
		try {
			const { id } = req.params;
			const { password } = req.body;
			const user = await User.findByPk(id);
			if (!user) {
				return MainController.handleFind(res);
			}
			user.password = password;
			await user.save({ fields: ['password'] });
			return res.status(200).json({
				data: {
					message: 'Password update successfully'
				}
			});
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}
}

export default UserController;
