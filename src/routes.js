import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

import uploadConfig from './config/upload';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.get('/users', UserController.index);

routes.use(authMiddleware);

routes.post('/files', upload.single('avatar'), FileController.store);

export default routes;
