const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

/**
 * Returns all tasks by boardId
 * @memberof task#
 * @returns {Promise<Task[]>} tasks
 */
const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

/**
 * Returns all tasks by userId
 * @memberof task#
 * @returns {Promise<Task[]>} tasks
 */
const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

/**
 * Creates a task
 * @memberof task#
 * @param {Task} data - data for task creation
 * @param {string} boardId - board Id
 * @returns {Promise<Task>} task
 */
const create = (data, boardId) => {
  const createdTask = new Task({ ...data, boardId, id: undefined });
  return tasksRepo.create(createdTask);
};

/**
 * Returns task by boardId and task id
 * @memberof task#
 * @param {string} boardId - board id
 * @param {string} id - task id
 * @returns {Promise<Task>} task
 */
const getByBoardIdByTaskId = (boardId, id) =>
  tasksRepo.getByBoardIdByTaskId(boardId, id);

/**
 * Updates a task
 * @memberof task#
 * @param {Task} data - data for task update
 * @returns {Promise<Task>} task
 */
const update = (data) => {
  const task = new Task(data);
  return tasksRepo.update(task);
};

/**
 * Removes a task
 * @memberof task#
 * @param {string} id - id of the task
 * @returns {Promise}
 */
const remove = (id) => tasksRepo.remove(id);

/**
 * Removes all tasks by boardId
 * @memberof task#
 * @param {string} id - boardId
 * @returns {Promise}
 */
const removeAllByBoardId = (id) => tasksRepo.removeAllByBoardId(id);

/**
 * Unassign all tasks by user id
 * @memberof task#
 * @param {string} userId - userId
 * @returns {Promise}
 */
const unassignAllTasksByUserId = async (userId) => {
  const tasksByUserId = await getAllByUserId(userId);

  return Promise.all(
    tasksByUserId.map(async (task) => {
      await update({ ...task, userId: null });
    })
  );
};

module.exports = {
  getAllByBoardId,
  create,
  getByBoardIdByTaskId,
  update,
  remove,
  removeAllByBoardId,
  unassignAllTasksByUserId,
};
