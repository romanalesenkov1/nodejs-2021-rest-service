import boardsRepo from './board.memory.repository';
import Board from './board.model';
import tasksService from '../tasks/task.service';
import Column from './column.model';

/**
 * Returns all boards
 * @memberof board#
 * @returns {Promise<Board[]>} boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Creates a board
 * @memberof board#
 * @param {Board} data - data for board creation
 * @returns {Promise<Board>} board
 */
const create = (data: Board) => {
  const createdColumns = data.columns?.map((column) => new Column(column));
  const createdBoard = new Board({
    ...data,
    columns: createdColumns,
    id: undefined,
  });
  return boardsRepo.create(createdBoard);
};

/**
 * Returns board by id
 * @memberof board#
 * @param {string} id - board id
 * @returns {Promise<Board>} board
 */
const getById = (id: string) => boardsRepo.getById(id);

/**
 * Updates a board
 * @memberof board#
 * @param {string} id - id of the board
 * @param {Board} data - data for board update
 * @returns {Promise<Board>} user
 */
const update = (id: string, data: Board) => {
  const columns = data.columns?.map((column) => new Column(column));
  const board = new Board({ ...data, columns, id });
  return boardsRepo.update(id, board);
};

/**
 * Removes a board
 * @memberof board#
 * @param {string} id - id of the board
 * @returns {Promise}
 */
const remove = async (id: string) => {
  await boardsRepo.remove(id);
  return tasksService.removeAllByBoardId(id);
};

export default { getAll, create, getById, update, remove };
