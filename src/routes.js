import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.post('/files', upload.single('avatar'), FileController.store);

export default routes;
