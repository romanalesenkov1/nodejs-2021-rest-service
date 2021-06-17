import usersRepo from './user.memory.repository';
import User from './user.model';
import tasksService from '../tasks/task.service';

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
const create = (data: User) => {
  const createdUser = new User({ ...data, id: undefined });
  return usersRepo.create(createdUser);
};

/**
 * Returns user by id
 * @memberof user#
 * @param {string} id - user id
 * @returns {Promise<User>} user
 */
const getById = (id: string) => usersRepo.getById(id);

/**
 * Updates a user
 * @memberof user#
 * @param {string} id - id of the user
 * @param {User} data - data for user update
 * @returns {Promise<User>} user
 */
const update = (id: string, data: User) => {
  const user = new User({ ...data, id });
  return usersRepo.update(id, user);
};

/**
 * Removes a user
 * @memberof user#
 * @param {string} id - id of the user
 * @returns {Promise}
 */
const remove = async (id: string) => {
  await usersRepo.remove(id);
  return tasksService.unassignAllTasksByUserId(id);
};

export default { getAll, create, getById, update, remove };
