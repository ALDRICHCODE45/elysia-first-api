import { Todo } from "../../domain/entities/Todo";
import { ITodoRepository } from "../../domain/repositories/ITodoRepository";

/**
 * Implementación en memoria del repositorio de Todo
 * Esta es una implementación de infraestructura que puede ser reemplazada
 * por una implementación con base de datos sin afectar las capas superiores
 */
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: Todo[] = [];
  private nextId = 1;

  async findAll(): Promise<Todo[]> {
    return [...this.todos]; // Retornar copia para evitar mutaciones externas
  }

  async findById(id: number): Promise<Todo | null> {
    const todo = this.todos.find((t) => t.id === id);
    return todo || null;
  }

  async create(todo: Todo): Promise<Todo> {
    // Crear una nueva instancia con el ID asignado
    const newTodo = new Todo(
      this.nextId++,
      todo.title,
      todo.description,
      todo.completed,
      todo.createdAt,
      todo.updatedAt
    );

    this.todos.push(newTodo);
    return newTodo;
  }

  async update(id: number, todo: Todo): Promise<Todo | null> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return null;
    }

    // Crear una nueva instancia con los datos actualizados
    const updatedTodo = new Todo(
      id,
      todo.title,
      todo.description,
      todo.completed,
      this.todos[index].createdAt, // Preservar createdAt original
      todo.updatedAt
    );

    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      return false;
    }

    this.todos.splice(index, 1);
    return true;
  }

  async exists(id: number): Promise<boolean> {
    return this.todos.some((t) => t.id === id);
  }
}
