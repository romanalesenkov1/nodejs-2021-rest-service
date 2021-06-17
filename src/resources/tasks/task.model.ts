import { v4 as uuid } from 'uuid';
import { Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * @namespace task
 */

/** Class representing a task. */
@Entity('tasks')
class Task {
  @PrimaryColumn()
  id?: string;

  @Column()
  title?: string;

  @Column()
  order?: number;

  @Column()
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  userId?: string | null;

  @Column({ type: 'varchar', nullable: true })
  boardId?: string | null;

  @Column({ type: 'varchar', nullable: true })
  columnId?: string | null;

  /**
   * Create a task.
   * @constructor
   * @param {Task} task - The {@link Task} to be created
   * @property {string} task.id - The id of the task.
   * @property {string} task.title - The title of the task.
   * @property {number} task.order - The order of the task.
   * @property {string} task.description - The description of the task.
   * @property {string} task.userId - The id of the user.
   * @property {string} task.boardId - The id of the board.
   * @property {string} task.columnId - The id of the column.
   */
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null,
  }: Task = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
