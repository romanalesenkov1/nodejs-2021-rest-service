import { getRepository } from 'typeorm';
import Task from './task.model';

/**
 * Returns the all tasks by board id
 * @memberof task#
 * @returns {Promise<Task[]>}
 */
const getAllByBoardId = async (boardId: string) => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({ where: { boardId } });
};

/**
 * Returns the all tasks by user id
 * @memberof task#
 * @returns {Promise<Task[]>}
 */
const getAllByUserId = async (userId: string) => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({ where: { userId } });
};

/**
 * Creates task
 * @memberof task#
 * @param {Task} task
 * @returns {Promise<Task>}
 */
const create = async (task: Task) => {
  const taskRepository = getRepository(Task);
  return taskRepository.save(task);
};

/**
 * Returns task by board id and by task id
 * @memberof task#
 * @param {string} _boardId
 * @param {string} taskId
 * @returns {Promise<Task>}
 */
const getByBoardIdByTaskId = async (_boardId: string, taskId: string) => {
  const taskRepository = getRepository(Task);
  return taskRepository.findOne({ where: { id: taskId } });
};

/**
 * Updates task
 * @memberof task#
 * @param {string} id
 * @param {Task} taskToUpdate
 * @returns {Promise<Task>}
 */
const update = async (id: string, taskToUpdate: Task) => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ id });
  return taskRepository.save({ ...task, ...taskToUpdate });
};

/**
 * Removes task
 * @memberof task#
 * @param {string} id
 * @returns {Promise<Task>}
 */
const remove = async (id: string) => {
  const taskRepository = getRepository(Task);
  return taskRepository.delete({ id });
};

/**
 * Removes all tasks by boardId
 * @memberof task#
 * @param {string} boardId
 * @returns {Promise}
 */
const removeAllByBoardId = async (boardId: string) => {
  const taskRepository = getRepository(Task);
  const tasksToDelete = await taskRepository.find({ where: { boardId } });

  const promises = tasksToDelete.map(async (task) => {
    return await taskRepository.delete({ id: task.id! });
  });

  return await Promise.all(promises);
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
