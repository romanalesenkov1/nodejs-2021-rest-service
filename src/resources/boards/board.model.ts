import { v4 as uuid } from 'uuid';
import { Column as ORMColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import Column from './column.model';

/**
 * @namespace board
 */

/** Class representing a board. */
@Entity('boards')
class Board {
  @PrimaryColumn()
  id?: string;

  @ORMColumn()
  title?: string;

  @OneToMany(() => Column, (column) => column.board, { cascade: true })
  columns?: Column[];

  /**
   * Create a board.
   * @constructor
   * @param {Board} board - The {@link Board} to be created
   * @property {string} board.id - The id of the board.
   * @property {string} board.title - The title of the board.
   * @property {array} board.columns - The columns of the board.
   */
  constructor({ id = uuid(), title = 'BOARD', columns }: Board = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
