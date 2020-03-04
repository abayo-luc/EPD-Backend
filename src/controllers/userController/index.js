import MainController from '../main';
import db from '../../models';
const { User } = db;
class UserController extends MainController {
	static async index(_req, res) {
		try {
			const data = await User.findAll();
			return res.status(200).json({ data });
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}

	static async create(req, res) {
		try {
			const { username, password } = req.body;
			const data = await User.create({ username, password });
			data.password = undefined;
			return res.status(201).json({
				data
			});
		} catch (error) {
			return MainController.handleError(res, error);
		}
	}
}

export default UserController;
