import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const checkUser = await User.findOne({
      where: { email: req.body.email }
    });

    if (checkUser) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {
    const response = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['url', 'name', 'path']
      }
    });

    return res.json(response);
  }
}

export default new UserController();
