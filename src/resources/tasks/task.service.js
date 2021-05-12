const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

const create = (data, { boardId }) => {
  const createdTask = new Task({ ...data, boardId, id: undefined });
  return tasksRepo.create(createdTask);
};

const getByBoardIdByTaskId = (boardId, id) =>
  tasksRepo.getByBoardIdByTaskId(boardId, id);

const update = (data) => {
  const task = new Task(data);
  return tasksRepo.update(task);
};

const remove = (id) => tasksRepo.remove(id);

const removeAllByBoardId = (id) => tasksRepo.removeAllByBoardId(id);

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
