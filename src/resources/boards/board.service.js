const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

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

const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
