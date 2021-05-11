let users = [
  {
    id: '1',
    name: 'string',
    login: 'string2',
    password: 'string3',
  },
];

const getAll = async () => users;

const create = async (user) => {
  users = [...users, user];
  return user;
};

const getById = async (id) => users.find((user) => user.id === id);

const update = async (userToUpdate) => {
  const filteredUsers = users.filter((user) => user.id !== userToUpdate.id);
  users = [...filteredUsers, userToUpdate];
  return userToUpdate;
};

const remove = async (id) => {
  const filteredUsers = users.filter((user) => user.id !== id);
  const userToDelete = users.find((user) => user.id === id);
  users = [...filteredUsers];
  return userToDelete;
};

module.exports = { getAll, create, getById, update, remove };
