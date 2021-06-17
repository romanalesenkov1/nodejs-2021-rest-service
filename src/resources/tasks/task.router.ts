import express, { Request } from 'express';
import tasksService from './task.service';
import HttpException from '../../exceptions/HttpException';

const router = express.Router({ mergeParams: true });

interface IGetAllByBoardIdRequest extends Request {
  boardId?: string;
}

interface IPostByBoardIdRequest extends Request {
  boardId?: string;
}

interface IGetAllByBoardByTaskIdIdRequest extends Request {
  boardId?: string;
  taskId?: string;
}

interface IPutByBoardByTaskIdIdRequest extends Request {
  boardId?: string;
  taskId?: string;
}

router.route('/').get(async (req: IGetAllByBoardIdRequest, res, next) => {
  if (req.params['boardId']) {
    const tasks = await tasksService.getAllByBoardId(req.params['boardId']);
    res.json(tasks);
  } else {
    next(new HttpException(400, 'Bad Request'));
  }
});

router.route('/').post(async (req: IPostByBoardIdRequest, res, next) => {
  if (req.params['boardId']) {
    const task = await tasksService.create(req.body, req.params['boardId']);
    res.status(201).json(task);
  } else {
    next(new HttpException(400, 'Bad Request'));
  }
});

router
  .route('/:taskId')
  .get(async (req: IGetAllByBoardByTaskIdIdRequest, res, next) => {
    if (req.params['boardId'] && req.params['taskId']) {
      const task = await tasksService.getByBoardIdByTaskId(
        req.params['boardId'],
        req.params['taskId']
      );
      if (!task) {
        next(new HttpException(404, 'Task not found'));
      } else {
        res.json(task);
      }
    } else {
      next(new HttpException(400, 'Bad Request'));
    }
  });

router
  .route('/:taskId')
  .put(async (req: IPutByBoardByTaskIdIdRequest, res, next) => {
    const task = await tasksService.update(req.body.id, {
      ...req.body,
      boardId: req.params['boardId'],
      taskId: req.params['taskId'],
    });

    if (!task) {
      next(new HttpException(404, 'Task not found'));
    } else {
      res.json(task);
    }
  });

router.route('/:taskId').delete(async (req, res, next) => {
  const task = await tasksService.remove(req.params.taskId);
  if (!task) {
    next(new HttpException(404, 'Task not found'));
  } else {
    res.status(204).send();
  }
});

export default router;
