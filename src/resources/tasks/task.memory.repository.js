let tasks = [];

/**
 * Returns the all tasks by board id
 * @memberof task#
 * @returns {Promise<Task[]>}
 */
const getAllByBoardId = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Returns the all tasks by user id
 * @memberof task#
 * @returns {Promise<Task[]>}
 */
const getAllByUserId = async (userId) =>
  tasks.filter((task) => task.userId === userId);

/**
 * Creates task
 * @memberof task#
 * @param {Task} task
 * @returns {Promise<Task>}
 */
const create = async (task) => {
  tasks = [...tasks, task];
  return task;
};

/**
 * Returns task by board id and by task id
 * @memberof task#
 * @param {string} boardId
 * @param {string} taskId
 * @returns {Promise<Task>}
 */
const getByBoardIdByTaskId = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId);

/**
 * Updates task
 * @memberof task#
 * @param {Task} taskToUpdate
 * @returns {Promise<Task>}
 */
const update = async (taskToUpdate) => {
  const filteredTasks = tasks.filter((task) => task.id !== taskToUpdate.id);
  tasks = [...filteredTasks, taskToUpdate];
  return taskToUpdate;
};

/**
 * Removes task
 * @memberof task#
 * @param {string} id
 * @returns {Promise<Task>}
 */
const remove = async (id) => {
  const filteredTasks = tasks.filter((task) => task.id !== id);
  const taskToDelete = tasks.find((task) => task.id === id);
  tasks = [...filteredTasks];
  return taskToDelete;
};

/**
 * Removes all tasks by boardId
 * @memberof task#
 * @param {string} boardId
 * @returns {Promise}
 */
const removeAllByBoardId = async (boardId) => {
  const filteredTasks = tasks.filter((task) => task.boardId !== boardId);
  tasks = [...filteredTasks];
  return [];
};

export default {
  getAllByBoardId,
  create,
  getByBoardIdByTaskId,
  update,
  remove,
  removeAllByBoardId,
  getAllByUserId,
};
