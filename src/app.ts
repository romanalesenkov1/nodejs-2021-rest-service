import express, {NextFunction, Request, RequestHandler, Response} from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import HttpException from './exceptions/HttpException';
import {logger} from "./middleware/logger";

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json() as RequestHandler);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logger.requestsLogger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(logger.errorsLogger);

app.use((error: HttpException, _req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
  next()
})


process.on('uncaughtException', logger.uncaughtExceptionsLogger);
process.on('unhandledRejection', logger.unhandledRejectionsLogger);

/*
// Test uncaughtException
setTimeout(()=>{
  throw new Error ('ooooops')
}, 2000);
*/

/*
 // Test unhandledRejection
setTimeout(() => {
  Promise.reject(new Error('Oops!'))
}, 1500);
*/

export default app;
