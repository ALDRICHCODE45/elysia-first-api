import { Todo } from "../../domain/entities/Todo";
import { TodoDTO } from "../dtos/TodoDTO";

/**
 * Mapper para convertir entre entidades de dominio y DTOs
 */
export class TodoMapper {
  static toDTO(todo: Todo): TodoDTO {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  static toDTOs(todos: Todo[]): TodoDTO[] {
    return todos.map((todo) => this.toDTO(todo));
  }
}
