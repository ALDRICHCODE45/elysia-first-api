import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMapper } from "../mappers/TodoMapper";

/**
 * Caso de uso: Obtener todos los Todos
 */
export class GetTodosUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(): Promise<TodoDTO[]> {
    const todos = await this.todoRepository.findAll();
    return TodoMapper.toDTOs(todos);
  }
}

