import { getRepository } from 'typeorm';
import Board from './board.model';

/**
 * Returns the all users
 * @memberof board#
 * @returns {Promise<Board[]>}
 */
const getAll = async () => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({ relations: ['columns'] });
};

/**
 * Creates board
 * @memberof board#
 * @param {Board} board
 * @returns {Promise<Board>}
 */
const create = async (board: Board) => {
  const boardRepository = getRepository(Board);
  return boardRepository.save(board);
};

/**
 * Returns board by id
 * @memberof board#
 * @param {string} id
 * @returns {Promise<Board>}
 */
const getById = async (id: string) => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne({
    where: { id },
    relations: ['columns'],
  });
  if (!board) return null;
  return board;
};

/**
 * Updates board
 * @memberof board#
 * @param {string} id
 * @param {Board} boardToUpdate
 * @returns {Promise<Board>}
 */
const update = async (id: string, boardToUpdate: Board) => {
  const boardRepository = getRepository(Board);

  const board = await boardRepository.findOne({ id });

  return boardRepository.save({ ...board, ...boardToUpdate });
};

/**
 * Removes board
 * @memberof board#
 * @param {string} id
 * @returns {{}}
 */

const remove = async (id: string) => {
  const boardRepository = getRepository(Board);
  return boardRepository.delete({ id });
};

export default { getAll, create, getById, update, remove };
