import { Todo } from "../../domain/entities/Todo";
import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { CreateTodoDTO } from "../dtos/CreateTodoDTO";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMapper } from "../mappers/TodoMapper";
import { TodoValidationError } from "../../domain/errors/TodoErrors";

/**
 * Caso de uso: Crear un nuevo Todo
 */
export class CreateTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(dto: CreateTodoDTO): Promise<TodoDTO> {
    // Validación de negocio
    if (!dto.title || dto.title.trim().length === 0) {
      throw new TodoValidationError("El título es requerido");
    }

    if (dto.title.length > 100) {
      throw new TodoValidationError(
        "El título no puede exceder 100 caracteres"
      );
    }

    if (dto.description && dto.description.length > 500) {
      throw new TodoValidationError(
        "La descripción no puede exceder 500 caracteres"
      );
    }

    // Crear la entidad de dominio
    const todo = Todo.create({
      title: dto.title.trim(),
      description: dto.description?.trim(),
    });

    // Persistir usando el repositorio
    const createdTodo = await this.todoRepository.create(todo);

    // Convertir a DTO y retornar
    return TodoMapper.toDTO(createdTodo);
  }
}
