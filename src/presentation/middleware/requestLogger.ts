import { Elysia } from "elysia";

/**
 * Middleware para logging de peticiones
 */
export const requestLogger = (app: Elysia) => {
  return app.onRequest(({ request }) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${request.method} ${request.url}`);
  });
};

