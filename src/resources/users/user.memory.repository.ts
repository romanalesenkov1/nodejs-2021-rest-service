import { getRepository } from 'typeorm';
import User from './user.model';

/**
 * Returns the all users
 * @memberof user#
 * @returns {Promise<User[]>}
 */
const getAll = async () => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

/**
 * Creates user
 * @memberof user#
 * @param {User} user
 * @returns {Promise<User>}
 */
const create = async (user: User) => {
  const userRepository = getRepository(User);
  return userRepository.save(user);
};

/**
 * Returns user by id
 * @memberof user#
 * @param {string} id
 * @returns {Promise<User>}
 */
const getById = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });
  if (!user) return null;
  return user;
};

/**
 * Updates user
 * @memberof user#
 * @param {string} id
 * @param {User} userToUpdate
 * @returns {Promise<User>}
 */
const update = async (id: string, userToUpdate: User) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ id });

  return userRepository.save({ ...user, ...userToUpdate });
};

/**
 * Removes user
 * @memberof user#
 * @param {string} id
 * @returns {Promise<User>}
 */
const remove = async (id: string) => {
  const userRepository = getRepository(User);
  return userRepository.delete({ id });
};

export default { getAll, create, getById, update, remove };
