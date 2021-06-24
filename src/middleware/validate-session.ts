import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import userService from '../resources/users/user.service';

import { JWT_SECRET_KEY } from '../common/config';

const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        auth: false,
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }

    jwt.verify(sessionToken.slice(7), JWT_SECRET_KEY!, (_err, decoded) => {
      if (decoded) {
        userService.getById(decoded['id']).then(
          (user) => {
            req.user = user;
            next();
          },
          () => {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
          }
        );
      } else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
      }
    });
  }
};

export default validateSession;
