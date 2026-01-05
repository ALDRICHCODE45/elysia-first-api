import { ITodoRepository } from "../../domain/repositories/ITodoRepository";
import { InMemoryTodoRepository } from "../repositories/InMemoryTodoRepository";
import { CreateTodoUseCase } from "../../application/usecases/CreateTodoUseCase";
import { GetTodosUseCase } from "../../application/usecases/GetTodosUseCase";
import { GetTodoByIdUseCase } from "../../application/usecases/GetTodoByIdUseCase";
import { UpdateTodoUseCase } from "../../application/usecases/UpdateTodoUseCase";
import { ToggleTodoUseCase } from "../../application/usecases/ToggleTodoUseCase";
import { DeleteTodoUseCase } from "../../application/usecases/DeleteTodoUseCase";
import { TodoController } from "../../presentation/controllers/TodoController";

/**
 * Contenedor de dependencias
 * Implementa el patrón Dependency Injection
 * Centraliza la creación de instancias y sus dependencias
 */
export class DIContainer {
  // Repositorios
  private readonly todoRepository: ITodoRepository;

  // Casos de uso
  private readonly createTodoUseCase: CreateTodoUseCase;
  private readonly getTodosUseCase: GetTodosUseCase;
  private readonly getTodoByIdUseCase: GetTodoByIdUseCase;
  private readonly updateTodoUseCase: UpdateTodoUseCase;
  private readonly toggleTodoUseCase: ToggleTodoUseCase;
  private readonly deleteTodoUseCase: DeleteTodoUseCase;

  // Controladores
  private readonly todoController: TodoController;

  constructor() {
    // Inicializar repositorio
    this.todoRepository = new InMemoryTodoRepository();

    // Inicializar casos de uso (inyectar dependencias)
    this.createTodoUseCase = new CreateTodoUseCase(this.todoRepository);
    this.getTodosUseCase = new GetTodosUseCase(this.todoRepository);
    this.getTodoByIdUseCase = new GetTodoByIdUseCase(this.todoRepository);
    this.updateTodoUseCase = new UpdateTodoUseCase(this.todoRepository);
    this.toggleTodoUseCase = new ToggleTodoUseCase(this.todoRepository);
    this.deleteTodoUseCase = new DeleteTodoUseCase(this.todoRepository);

    // Inicializar controlador (inyectar casos de uso)
    this.todoController = new TodoController(
      this.createTodoUseCase,
      this.getTodosUseCase,
      this.getTodoByIdUseCase,
      this.updateTodoUseCase,
      this.toggleTodoUseCase,
      this.deleteTodoUseCase
    );
  }

  /**
   * Obtiene el controlador de Todo
   */
  getTodoController(): TodoController {
    return this.todoController;
  }

  /**
   * Obtiene el plugin de rutas de Todo
   */
  getTodoRoutesPlugin() {
    return this.todoController.createRoutesPlugin();
  }
}

/**
 * Instancia singleton del contenedor
 */
export const container = new DIContainer();
