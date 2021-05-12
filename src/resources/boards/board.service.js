const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const create = (data) => {
  const createdBoard = new Board({ ...data, id: undefined });
  return boardsRepo.create(createdBoard);
};

const getById = (id) => boardsRepo.getById(id);

const update = (id, data) => {
  const board = new Board({ ...data, id });
  return boardsRepo.update(board);
};

const remove = async (id) => {
  await boardsRepo.remove(id);
  return tasksService.removeAllByBoardId(id);
};

module.exports = { getAll, create, getById, update, remove };
