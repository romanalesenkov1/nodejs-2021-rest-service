import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import userService from '../resources/users/user.service';

import { JWT_SECRET_KEY } from '../common/config';

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  console.log(JSON.stringify(req));
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken) {
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(sessionToken, JWT_SECRET_KEY!, (_err, decoded) => {
      if (decoded) {
        userService.getById(decoded['id']).then(
          (user) => {
            req.user = user;
            console.log(`user: ${user}`);
            next();
          },
          () => {
            res.status(401).send({ error: 'not authorized' });
          }
        );
      } else {
        res.status(400).send({ error: 'not authorized' });
      }
    });
  }
};

export default validateSession;
