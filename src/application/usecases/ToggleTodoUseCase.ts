import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { TodoNotFoundError } from "../../domain/errors/TodoErrors";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMapper } from "../mappers/TodoMapper";

/**
 * Caso de uso: Alternar el estado completado de un Todo
 */
export class ToggleTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: number): Promise<TodoDTO> {
    const existingTodo = await this.todoRepository.findById(id);

    if (!existingTodo) {
      throw new TodoNotFoundError(id);
    }

    // Usar el método de dominio para alternar
    const toggledTodo = existingTodo.toggle();

    // Persistir los cambios
    const savedTodo = await this.todoRepository.update(id, toggledTodo);

    if (!savedTodo) {
      throw new TodoNotFoundError(id);
    }

    return TodoMapper.toDTO(savedTodo);
  }
}
