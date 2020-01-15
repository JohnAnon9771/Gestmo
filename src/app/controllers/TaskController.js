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

  async update(req, res) {
    const schema = Yup.object().shape({
      discipline: Yup.string(),
      content: Yup.string(),
      importance: Yup.string(),
      term: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations Fails' });
    }

    const { task_id } = req.params;
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(400).json({ error: 'Task not exist' });
    }
    const newTask = await task.update(req.body);

    return res.json(newTask);
  }
}

export default new TaskController();
