import { Elysia } from "elysia";
import { TodoNotFoundError } from "../../domain/errors/TodoErrors";
import { TodoValidationError } from "../../domain/errors/TodoErrors";

/**
 * Middleware para manejo global de errores
 * Convierte errores de dominio a respuestas HTTP apropiadas
 */
export const errorHandler = (app: Elysia) => {
  return app
    .error({
      TODO_NOT_FOUND: TodoNotFoundError,
      TODO_VALIDATION: TodoValidationError,
    })
    .onError(({ code, error, set }) => {
      console.error(`[ERROR ${code}]:`, error);

      // Error de validación
      if (code === "VALIDATION" || code === "TODO_VALIDATION") {
        set.status = 422;
        return {
          success: false,
          error: "ValidationError",
          message: error.message || "Error de validación",
          statusCode: 422,
        };
      }

      // Todo no encontrado
      if (code === "TODO_NOT_FOUND") {
        set.status = 404;
        return {
          success: false,
          error: (error as Error).name,
          message: (error as Error).message,
          statusCode: 404,
        };
      }

      // Error genérico
      set.status = 500;
      return {
        success: false,
        error: "InternalServerError",
        message: "Error interno del servidor",
        statusCode: 500,
      };
    });
};

