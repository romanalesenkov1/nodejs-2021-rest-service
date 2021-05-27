import { v4 as uuid } from 'uuid';

/**
 * @namespace board
 */

/** Class representing a board. */
class Board {
  /**
   * Create a board.
   * @constructor
   * @param {Board} board - The {@link Board} to be created
   * @property {string} board.id - The id of the board.
   * @property {string} board.title - The title of the board.
   * @property {array} board.columns - The columns of the board.
   */
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
