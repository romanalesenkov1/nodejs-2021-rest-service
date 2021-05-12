const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const tasksService = require('../tasks/task.service');

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

const remove = async (id) => {
  await usersRepo.remove(id);
  return tasksService.unassignAllTasksByUserId(id);
};

module.exports = { getAll, create, getById, update, remove };
