import { v4 as uuidv4 } from 'uuid';
import { PrimaryColumn, Column as ORMColumn, ManyToOne, Entity } from 'typeorm';
import Board from './board.model';

@Entity('columns')
export default class Column {
  @PrimaryColumn()
  id?: string;

  @ORMColumn()
  title: string;

  @ORMColumn()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board?: Board;

  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
