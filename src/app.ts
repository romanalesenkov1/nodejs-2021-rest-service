import express, {NextFunction, Request, Response} from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { URL } from 'url';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import HttpException from './exceptions/HttpException';

const __dirname = new URL('.', import.meta.url).pathname;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((error: HttpException, _req: Request, res: Response, next: NextFunction) => {
  if (_req.xhr) {
    res.status(error.status || 500).send(error.message);
  } else {
    next(error);
  }
})

export default app;
