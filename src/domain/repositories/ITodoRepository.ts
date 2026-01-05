import { Todo } from "../entities/Todo";

/**
 * Interfaz del repositorio de Todo
 * Define el contrato para el acceso a datos (Infrastructure Layer)
 * Implementación del principio de inversión de dependencias
 */
export interface ITodoRepository {
  /**
   * Obtiene todos los todos
   */
  findAll(): Promise<Todo[]>;

  /**
   * Obtiene un todo por ID
   */
  findById(id: number): Promise<Todo | null>;

  /**
   * Crea un nuevo todo
   */
  create(todo: Todo): Promise<Todo>;

  /**
   * Actualiza un todo existente
   */
  update(id: number, todo: Todo): Promise<Todo | null>;

  /**
   * Elimina un todo
   */
  delete(id: number): Promise<boolean>;

  /**
   * Verifica si un todo existe
   */
  exists(id: number): Promise<boolean>;
}
