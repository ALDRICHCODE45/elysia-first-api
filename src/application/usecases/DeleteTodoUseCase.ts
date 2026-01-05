import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { TodoNotFoundError } from "../../domain/errors/TodoErrors";

/**
 * Caso de uso: Eliminar un Todo
 */
export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: number): Promise<void> {
    const exists = await this.todoRepository.exists(id);

    if (!exists) {
      throw new TodoNotFoundError(id);
    }

    const deleted = await this.todoRepository.delete(id);

    if (!deleted) {
      throw new TodoNotFoundError(id);
    }
  }
}
