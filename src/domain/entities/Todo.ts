/**
 * Entidad de dominio: Todo
 * Representa la entidad de negocio central de la aplicación
 */
export class Todo {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly completed: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  /**
   * Factory method para crear un nuevo Todo
   */
  static create(data: { title: string; description?: string }): Todo {
    const now = new Date();
    return new Todo(
      0, // ID será asignado por el repositorio
      data.title,
      data.description,
      false,
      now,
      now
    );
  }

  /**
   * Método para marcar como completado
   */
  markAsCompleted(): Todo {
    return new Todo(
      this.id,
      this.title,
      this.description,
      true,
      this.createdAt,
      new Date()
    );
  }

  /**
   * Método para marcar como pendiente
   */
  markAsPending(): Todo {
    return new Todo(
      this.id,
      this.title,
      this.description,
      false,
      this.createdAt,
      new Date()
    );
  }

  /**
   * Método para alternar el estado
   */
  toggle(): Todo {
    return this.completed ? this.markAsPending() : this.markAsCompleted();
  }

  /**
   * Método para actualizar el todo
   */
  update(data: {
    title?: string;
    description?: string;
    completed?: boolean;
  }): Todo {
    return new Todo(
      this.id,
      data.title ?? this.title,
      data.description !== undefined ? data.description : this.description,
      data.completed ?? this.completed,
      this.createdAt,
      new Date()
    );
  }
}
