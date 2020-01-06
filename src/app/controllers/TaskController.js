import * as Yup from 'yup';
import Task from '../models/Task';
import User from '../models/User';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      discipline: Yup.string(),
      content: Yup.string(),
      importance: Yup.string(),
      term: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { discipline, content, importance, term } = req.body;
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not is logged in' });
    }
    const task = await Task.create({
      user_id: req.userId,
      discipline,
      content,
      importance,
      term
    });

    return res.json(task);
  }
}

export default new TaskController();
