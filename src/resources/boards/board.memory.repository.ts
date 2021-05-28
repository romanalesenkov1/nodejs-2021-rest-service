import Board from './board.model';

let boards: Board[] = [];

/**
 * Returns the all users
 * @memberof board#
 * @returns {Promise<Board[]>}
 */
const getAll = async () => boards;

/**
 * Creates board
 * @memberof board#
 * @param {Board} board
 * @returns {Promise<Board>}
 */
const create = async (board: Board) => {
  boards = [...boards, board];
  return board;
};

/**
 * Returns board by id
 * @memberof board#
 * @param {string} id
 * @returns {Promise<Board>}
 */
const getById = async (id: string) => boards.find((board) => board.id === id);

/**
 * Updates board
 * @memberof board#
 * @param {Board} boardToUpdate
 * @returns {Promise<Board>}
 */
const update = async (boardToUpdate: Board) => {
  const filteredBoards = boards.filter(
    (board) => board.id !== boardToUpdate.id
  );
  boards = [...filteredBoards, boardToUpdate];
  return boardToUpdate;
};

/**
 * Removes board
 * @memberof board#
 * @param {string} id
 * @returns {{}}
 */
const remove = async (id: string) => {
  const filteredUsers = boards.filter((board) => board.id !== id);
  boards = [...filteredUsers];
  return {};
};

export default { getAll, create, getById, update, remove };
