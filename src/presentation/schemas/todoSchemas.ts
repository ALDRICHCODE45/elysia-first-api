import { t } from "elysia";

/**
 * Schemas de validación para la capa de presentación
 * Estos schemas son específicos de Elysia y se usan para validar requests HTTP
 */

export const CreateTodoSchema = t.Object({
  title: t.String({ minLength: 1, maxLength: 100 }),
  description: t.Optional(t.String({ maxLength: 500 })),
});

export const UpdateTodoSchema = t.Object({
  title: t.Optional(t.String({ minLength: 1, maxLength: 100 })),
  description: t.Optional(t.String({ maxLength: 500 })),
  completed: t.Optional(t.Boolean()),
});

export const TodoResponseSchema = t.Object({
  id: t.Number(),
  title: t.String(),
  description: t.Optional(t.String()),
  completed: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const TodosResponseSchema = t.Array(TodoResponseSchema);

export const SuccessResponseSchema = t.Object({
  success: t.Boolean(),
  message: t.String(),
  data: TodoResponseSchema,
});

export const ListResponseSchema = t.Object({
  success: t.Boolean(),
  data: TodosResponseSchema,
  count: t.Number(),
});

export const DeleteResponseSchema = t.Object({
  success: t.Boolean(),
  message: t.String(),
  data: t.Object({
    id: t.Number(),
  }),
});

export const ErrorResponseSchema = t.Object({
  success: t.Boolean(),
  error: t.String(),
  message: t.String(),
  statusCode: t.Number(),
});
