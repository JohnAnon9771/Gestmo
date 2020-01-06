import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import Task from '../models/Task';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const checkUser = await User.findOne({
      where: { email: req.body.email }
    });

    if (checkUser) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async show(req, res) {
    const response = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['url', 'name', 'path']
        },
        {
          attributes: ['id', 'discipline', 'content', 'importance', 'term'],
          association: 'tasks'
        }
      ]
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmedPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exist' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const newUser = await user.update(req.body);
    return res.json(newUser);
  }
}

export default new UserController();
