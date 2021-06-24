import User from '../../src/resources/users/user.service';

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}
