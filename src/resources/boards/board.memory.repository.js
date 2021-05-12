let boards = [];

const getAll = async () => boards;

const create = async (board) => {
  boards = [...boards, board];
  return board;
};

const getById = async (id) => boards.find((board) => board.id === id);

const update = async (boardToUpdate) => {
  const filteredBoards = boards.filter(
    (board) => board.id !== boardToUpdate.id
  );
  boards = [...filteredBoards, boardToUpdate];
  return boardToUpdate;
};

const remove = async (id) => {
  const filteredUsers = boards.filter((board) => board.id !== id);
  boards = [...filteredUsers];
  return {};
};

module.exports = { getAll, create, getById, update, remove };
