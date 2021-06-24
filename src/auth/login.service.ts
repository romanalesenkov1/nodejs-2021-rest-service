import usersService from '../resources/users/user.service';

const login = (data: { login: string; password: string }) => {
  return usersService.getByLogin(data.login);
};

export default { login };
