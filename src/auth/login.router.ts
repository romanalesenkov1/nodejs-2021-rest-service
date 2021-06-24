import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { JWT_SECRET_KEY } from '../common/config';
import loginService from './login.service';

const router = express.Router();

router.route('/login').post(async (req, res) => {
  const user = await loginService.login(req.body);
  if (user) {
    bcrypt.compare(req.body.password, user.password!, (_err, matches) => {
      if (matches) {
        const token = jwt.sign(
          { userId: user.id, login: user.login },
          JWT_SECRET_KEY as string,
          {
            expiresIn: 60 * 60 * 24,
          }
        );
        res.json({
          user,
          message: 'Successfully authenticated.',
          token,
        });
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ error: 'Passwords do not match.' });
      }
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({ error: 'User not found.' });
  }
});

export default router;
