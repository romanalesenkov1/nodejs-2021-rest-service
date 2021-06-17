import tasksRepo from './task.memory.repository';
import Task from './task.model';

/**
 * Returns all tasks by boardId
 * @memberof task#
 * @returns {Promise<Task[]>} tasks
 */
const getAllByBoardId = (boardId: string) => tasksRepo.getAllByBoardId(boardId);

/**
 * Returns all tasks by userId
 * @memberof task#
 * @returns {Promise<Task[]>} tasks
 */
const getAllByUserId = (userId: string) => tasksRepo.getAllByUserId(userId);

/**
 * Creates a task
 * @memberof task#
 * @param {Task} data - data for task creation
 * @param {string} boardId - board Id
 * @returns {Promise<Task>} task
 */
const create = (data: Task, boardId: string) => {
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
const getByBoardIdByTaskId = (boardId: string, id: string) =>
  tasksRepo.getByBoardIdByTaskId(boardId, id);

/**
 * Updates a task
 * @memberof task#
 * @param {string} id - task id
 * @param {Task} data - data for task update
 * @returns {Promise<Task>} task
 */
const update = (id: string, data: Task) => {
  const task = new Task(data);
  return tasksRepo.update(id, task);
};

/**
 * Removes a task
 * @memberof task#
 * @param {string} id - id of the task
 * @returns {Promise}
 */
const remove = (id: string) => tasksRepo.remove(id);

/**
 * Removes all tasks by boardId
 * @memberof task#
 * @param {string} id - boardId
 * @returns {Promise}
 */
const removeAllByBoardId = (id: string) => tasksRepo.removeAllByBoardId(id);

/**
 * Unassign all tasks by user id
 * @memberof task#
 * @param {string} userId - userId
 * @returns {Promise}
 */
const unassignAllTasksByUserId = async (userId: string) => {
  const tasksByUserId = await getAllByUserId(userId);

  const promises = tasksByUserId.map(async (task) => {
    await update(task.id!, { ...task, userId: null });
  });

  return Promise.all(promises);
};

export default {
  getAllByBoardId,
  create,
  getByBoardIdByTaskId,
  update,
  remove,
  removeAllByBoardId,
  unassignAllTasksByUserId,
};
