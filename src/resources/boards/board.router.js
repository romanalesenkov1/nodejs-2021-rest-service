const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(201).json(board);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.json(board);
  }
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardsService.update(req.params.boardId, req.body);
  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.json(board);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const board = await boardsService.remove(req.params.boardId);
  if (!board) {
    res.status(404).send('Board not found');
  } else {
    res.status(204).send();
  }
});

module.exports = router;
