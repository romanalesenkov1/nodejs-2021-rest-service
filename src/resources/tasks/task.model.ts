import { v4 as uuid } from 'uuid';

/**
 * @namespace task
 */

/** Class representing a task. */
class Task {
  id?: string;

  title?: string;

  order?: number;

  description?: string;

  userId?: string | null;

  boardId?: string | null;

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
