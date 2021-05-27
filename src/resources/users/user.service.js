const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');

/**
 * Returns all users
 * @memberof user#
 * @returns {Promise<User[]>} users
 */
const getAll = () => usersRepo.getAll();

/**
 * Creates a user
 * @memberof user#
 * @param {User} data - data for user creation
 * @returns {Promise<User>} user
 */
const create = (data) => {
  const createdUser = new User({ ...data, id: undefined });
  return usersRepo.create(createdUser);
};

/**
 * Returns user by id
 * @memberof user#
 * @param {string} id - user id
 * @returns {Promise<User>} user
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Updates a user
 * @memberof user#
 * @param {string} id - id of the user
 * @param {User} data - data for user update
 * @returns {Promise<User>} user
 */
const update = (id, data) => {
  const user = new User({ ...data, id });
  return usersRepo.update(user);
};

/**
 * Removes a user
 * @memberof user#
 * @param {string} id - id of the user
 * @returns {Promise}
 */
const remove = async (id) => {
  await usersRepo.remove(id);
  return tasksService.unassignAllTasksByUserId(id);
};

module.exports = { getAll, create, getById, update, remove };
