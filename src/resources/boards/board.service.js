const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

/**
 * Returns all boards
 * @returns {Promise<Board[]>} boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Creates a board
 * @param {Board} data - data for board creation
 * @returns {Promise<Board>} board
 */
const create = (data) => {
  const createdBoard = new Board({ ...data, id: undefined });
  return boardsRepo.create(createdBoard);
};

/**
 * Returns board by id
 * @param {string} id - board id
 * @returns {Promise<Board>} board
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Updates a board
 * @param {string} id - id of the board
 * @param {Board} data - data for board update
 * @returns {Promise<Board>} user
 */
const update = (id, data) => {
  const board = new Board({ ...data, id });
  return boardsRepo.update(board);
};

/**
 * Removes a board
 * @param {string} id - id of the board
 * @returns {Promise}
 */
const remove = async (id) => {
  await boardsRepo.remove(id);
  return tasksService.removeAllByBoardId(id);
};

module.exports = { getAll, create, getById, update, remove };
