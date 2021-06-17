import express from 'express';
import boardsService from './board.service';
import HttpException from '../../exceptions/HttpException';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(201).json(board);
});

router.route('/:boardId').get(async (req, res, next) => {
  const board = await boardsService.getById(req.params.boardId);
  if (!board) {
    next(new HttpException(404, 'Board not found'));
  } else {
    res.json(board);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const board = await boardsService.update(req.params.boardId, req.body);
  if (!board) {
    next(new HttpException(404, 'Board not found'));
  } else {
    res.json(board);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const board = await boardsService.remove(req.params.boardId);
  if (!board) {
    next(new HttpException(404, 'Board not found'));
  } else {
    res.status(204).send();
  }
});

export default router;
