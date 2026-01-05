import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { TodoNotFoundError } from "../../domain/errors/TodoErrors";
import { TodoValidationError } from "../../domain/errors/TodoErrors";
import { UpdateTodoDTO } from "../dtos/UpdateTodoDTO";
import { TodoDTO } from "../dtos/TodoDTO";
import { TodoMapper } from "../mappers/TodoMapper";

/**
 * Caso de uso: Actualizar un Todo
 */
export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: number, dto: UpdateTodoDTO): Promise<TodoDTO> {
    // Validaciones de negocio
    if (dto.title !== undefined) {
      if (!dto.title || dto.title.trim().length === 0) {
        throw new TodoValidationError("El título no puede estar vacío");
      }
      if (dto.title.length > 100) {
        throw new TodoValidationError(
          "El título no puede exceder 100 caracteres"
        );
      }
    }

    if (dto.description !== undefined && dto.description.length > 500) {
      throw new TodoValidationError(
        "La descripción no puede exceder 500 caracteres"
      );
    }

    // Obtener el todo existente
    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      throw new TodoNotFoundError(id);
    }

    // Aplicar la actualización usando el método de dominio
    const updatedTodo = existingTodo.update({
      title: dto.title?.trim(),
      description: dto.description?.trim(),
      completed: dto.completed,
    });

    // Persistir los cambios
    const savedTodo = await this.todoRepository.update(id, updatedTodo);

    if (!savedTodo) {
      throw new TodoNotFoundError(id);
    }

    return TodoMapper.toDTO(savedTodo);
  }
}

