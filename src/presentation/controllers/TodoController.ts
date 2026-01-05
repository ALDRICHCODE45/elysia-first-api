import { Elysia, t } from "elysia";
import { CreateTodoUseCase } from "../../application/usecases/CreateTodoUseCase";
import { GetTodosUseCase } from "../../application/usecases/GetTodosUseCase";
import { GetTodoByIdUseCase } from "../../application/usecases/GetTodoByIdUseCase";
import { UpdateTodoUseCase } from "../../application/usecases/UpdateTodoUseCase";
import { ToggleTodoUseCase } from "../../application/usecases/ToggleTodoUseCase";
import { DeleteTodoUseCase } from "../../application/usecases/DeleteTodoUseCase";
import {
  CreateTodoSchema,
  UpdateTodoSchema,
  TodoResponseSchema,
  TodosResponseSchema,
  SuccessResponseSchema,
  ListResponseSchema,
  DeleteResponseSchema,
  ErrorResponseSchema,
} from "../schemas/todoSchemas";

/**
 * Controlador de Todo
 * Maneja las peticiones HTTP y delega la lógica de negocio a los casos de uso
 */
export class TodoController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly getTodosUseCase: GetTodosUseCase,
    private readonly getTodoByIdUseCase: GetTodoByIdUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly toggleTodoUseCase: ToggleTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  /**
   * Crea un plugin de Elysia con las rutas del controlador
   */
  createRoutesPlugin() {
    const controller = this;
    return (app: Elysia) =>
      app.group("/todos", (app) =>
        app
          // GET /todos - Obtener todos los todos
          .get(
            "/",
            async () => {
              const todos = await this.getTodosUseCase.execute();
              return {
                success: true,
                data: todos,
                count: todos.length,
              };
            },
            {
              response: {
                200: ListResponseSchema,
              },
            }
          )

          // GET /todos/:id - Obtener un todo por ID
          .get(
            "/:id",
            async ({ params }) => {
              const id = Number(params.id);
              const todo = await controller.getTodoByIdUseCase.execute(id);
              return {
                success: true,
                data: todo,
              };
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
              response: {
                200: t.Object({
                  success: t.Boolean(),
                  data: TodoResponseSchema,
                }),
                404: ErrorResponseSchema,
              },
            }
          )

          // POST /todos - Crear un nuevo todo
          .post(
            "/",
            async ({ body, set }) => {
              const todo = await controller.createTodoUseCase.execute(body);
              set.status = 201;
              return {
                success: true,
                message: "Todo creado exitosamente",
                data: todo,
              };
            },
            {
              body: CreateTodoSchema,
              response: {
                201: SuccessResponseSchema,
                422: ErrorResponseSchema,
              },
            }
          )

          // PUT /todos/:id - Actualizar un todo completo
          .put(
            "/:id",
            async ({ params, body }) => {
              const id = Number(params.id);
              const todo = await controller.updateTodoUseCase.execute(id, body);
              return {
                success: true,
                message: "Todo actualizado exitosamente",
                data: todo,
              };
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
              body: UpdateTodoSchema,
              response: {
                200: SuccessResponseSchema,
                404: ErrorResponseSchema,
                422: ErrorResponseSchema,
              },
            }
          )

          // PATCH /todos/:id - Actualizar parcialmente un todo
          .patch(
            "/:id",
            async ({ params, body }) => {
              const id = Number(params.id);
              const todo = await controller.updateTodoUseCase.execute(id, body);
              return {
                success: true,
                message: "Todo actualizado parcialmente",
                data: todo,
              };
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
              body: UpdateTodoSchema,
              response: {
                200: SuccessResponseSchema,
                404: ErrorResponseSchema,
                422: ErrorResponseSchema,
              },
            }
          )

          // PATCH /todos/:id/toggle - Alternar estado completado
          .patch(
            "/:id/toggle",
            async ({ params }) => {
              const id = Number(params.id);
              const todo = await controller.toggleTodoUseCase.execute(id);
              return {
                success: true,
                message: "Estado del todo alternado",
                data: todo,
              };
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
              response: {
                200: SuccessResponseSchema,
                404: ErrorResponseSchema,
              },
            }
          )

          // DELETE /todos/:id - Eliminar un todo
          .delete(
            "/:id",
            async ({ params }) => {
              const id = Number(params.id);
              await controller.deleteTodoUseCase.execute(id);
              return {
                success: true,
                message: "Todo eliminado exitosamente",
                data: { id },
              };
            },
            {
              params: t.Object({
                id: t.Number(),
              }),
              response: {
                200: DeleteResponseSchema,
                404: ErrorResponseSchema,
              },
            }
          )
      );
  }
}
