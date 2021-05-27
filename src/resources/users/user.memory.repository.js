let users = [];

/**
 * Returns the all users
 * @memberof user#
 * @returns {Promise<User[]>}
 */
const getAll = async () => users;

/**
 * Creates user
 * @memberof user#
 * @param {User} user
 * @returns {Promise<User>}
 */
const create = async (user) => {
  users = [...users, user];
  return user;
};

/**
 * Returns user by id
 * @memberof user#
 * @param {string} id
 * @returns {Promise<User>}
 */
const getById = async (id) => users.find((user) => user.id === id);

/**
 * Updates user
 * @memberof user#
 * @param {User} userToUpdate
 * @returns {Promise<User>}
 */
const update = async (userToUpdate) => {
  const filteredUsers = users.filter((user) => user.id !== userToUpdate.id);
  users = [...filteredUsers, userToUpdate];
  return userToUpdate;
};

/**
 * Removes user
 * @memberof user#
 * @param {string} id
 * @returns {Promise<User>}
 */
const remove = async (id) => {
  const filteredUsers = users.filter((user) => user.id !== id);
  const userToDelete = users.find((user) => user.id === id);
  users = [...filteredUsers];
  return userToDelete;
};

export default { getAll, create, getById, update, remove };
