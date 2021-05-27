let boards = [];

/**
 * Returns the all users
 * @returns {Promise<Board[]>}
 */
const getAll = async () => boards;

/**
 * Creates board
 * @param {Board} board
 * @returns {Promise<Board>}
 */
const create = async (board) => {
  boards = [...boards, board];
  return board;
};

/**
 * Returns board by id
 * @param {string} id
 * @returns {Promise<Board>}
 */
const getById = async (id) => boards.find((board) => board.id === id);

/**
 * Updates board
 * @param {Board} boardToUpdate
 * @returns {Promise<Board>}
 */
const update = async (boardToUpdate) => {
  const filteredBoards = boards.filter(
    (board) => board.id !== boardToUpdate.id
  );
  boards = [...filteredBoards, boardToUpdate];
  return boardToUpdate;
};

/**
 * Removes board
 * @param {string} id
 * @returns {{}}
 */
const remove = async (id) => {
  const filteredUsers = boards.filter((board) => board.id !== id);
  boards = [...filteredUsers];
  return {};
};

module.exports = { getAll, create, getById, update, remove };
