import MainController from '../main';
import db from '../../models';
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
			const { username, password, email, phoneNumber } = req.body;
			const data = await User.create({
				username,
				password,
				email,
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
			const user = await User.findOne({ where: { id } });
			if (!user) {
				return MainController.handleFind(res);
			}
			['phoneNumber', 'name', 'username'].forEach(item => {
				if (req.body[item]) user[item] = req.body[item];
				if (req.body[item]) fields.push(item);
			});
			console.log(req.body.phoneNumber);
			const data = await user.save({ fields });
			return res.status(200).json({ data });
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}
}

export default UserController;
