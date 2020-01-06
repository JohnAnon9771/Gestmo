import Task from '../models/Task';
import User from '../models/User';

class TaskController {
  async store(req, res) {
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
