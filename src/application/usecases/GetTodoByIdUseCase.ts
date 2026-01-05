import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { TodoNotFoundError } from "../../domain/errors/TodoErrors";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMapper } from "../mappers/TodoMapper";

/**
 * Caso de uso: Obtener un Todo por ID
 */
export class GetTodoByIdUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: number): Promise<TodoDTO> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new TodoNotFoundError(id);
    }

    return TodoMapper.toDTO(todo);
  }
}
