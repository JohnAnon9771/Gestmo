import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export default {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'upload'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    }
  })
};
