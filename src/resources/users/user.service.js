const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const create = (data) => {
  const createdUser = new User({ ...data, id: undefined });
  return usersRepo.create(createdUser);
};

const getById = (id) => usersRepo.getById(id);

const update = (id, data) => {
  const user = new User({ ...data, id });
  return usersRepo.update(user);
};

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
