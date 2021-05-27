let tasks = [];

const getAllByBoardId = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const getAllByUserId = async (userId) =>
  tasks.filter((task) => task.userId === userId);

const create = async (task) => {
  tasks = [...tasks, task];
  return task;
};

const getByBoardIdByTaskId = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId);

const update = async (taskToUpdate) => {
  const filteredTasks = tasks.filter((task) => task.id !== taskToUpdate.id);
  tasks = [...filteredTasks, taskToUpdate];
  return taskToUpdate;
};

const remove = async (id) => {
  const filteredTasks = tasks.filter((task) => task.id !== id);
  const taskToDelete = tasks.find((task) => task.id === id);
  tasks = [...filteredTasks];
  return taskToDelete;
};

const removeAllByBoardId = async (boardId) => {
  const filteredTasks = tasks.filter((task) => task.boardId !== boardId);
  tasks = [...filteredTasks];
  return [];
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdByTaskId,
  update,
  remove,
  removeAllByBoardId,
  getAllByUserId,
};
