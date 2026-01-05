import { Elysia } from "elysia";

/**
 * Middleware para agregar headers personalizados a las respuestas
 */
export const responseHeaders = (app: Elysia) => {
  return app.onAfterHandle(({ set }) => {
    set.headers["x-powered-by"] = "Elysia";
    set.headers["x-api-version"] = "1.0.0";
  });
};

