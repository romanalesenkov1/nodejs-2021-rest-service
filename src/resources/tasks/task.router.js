const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllByBoardId(req.params.boardId);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(req.body, req.params.boardId);
  res.status(201).json(task);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getByBoardIdByTaskId(
    req.params.boardId,
    req.params.taskId
  );
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.update({
    ...req.body,
    boardId: req.params.boardId,
    taskId: req.params.taskId,
  });

  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const task = await tasksService.remove(req.params.taskId);
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.status(204).send();
  }
});

module.exports = router;
