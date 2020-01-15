import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.show);
routes.delete('/users', UserController.destroy);

routes.post('/tasks', TaskController.store);
routes.put('/tasks/:task_id', TaskController.update);

routes.post('/files', upload.single('avatar'), FileController.store);

export default routes;
