import { v4 as uuid } from 'uuid';

/**
 * @namespace user
 */

/** Class representing a user. */
class User {
  id?: string;

  name?: string;

  login?: string;

  password?: string;

  /**
   * Create a user.
   * @constructor
   * @param {User} user - The {@link User} to be created
   * @property {string} user.id - The id of the user.
   * @property {string} user.name - The name of the user.
   * @property {string} user.login - The login of the user.
   * @property {string} user.password - The password of the user.
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: User = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * A response user
   * @typedef {Object} ResponseUser
   * @property {string} id - The id of the user.
   * @property {string} name - The name of the user.
   * @property {string} login - The login of the user.
   */

  /**
   * Map user fields to exclude secret fields like "password"
   * @static
   * @memberof user#
   * @param {User} user - The {@link User}
   * @return {ResponseUser} responseUser
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
