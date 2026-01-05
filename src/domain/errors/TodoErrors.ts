/**
 * Errores del dominio
 * Errores específicos de la lógica de negocio
 */

export class TodoNotFoundError extends Error {
  constructor(public readonly todoId: number) {
    super(`Todo con ID ${todoId} no encontrado`);
    this.name = "TodoNotFoundError";
  }
}

export class TodoValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoValidationError";
  }
}
