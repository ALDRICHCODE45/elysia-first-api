import { Elysia } from "elysia";
import { container } from "./infrastructure/dependency-injection/container";
import { errorHandler } from "./presentation/middleware/errorHandler";
import { requestLogger } from "./presentation/middleware/requestLogger";
import { responseHeaders } from "./presentation/middleware/responseHeaders";

/**
 * Punto de entrada de la aplicación
 * Configura la aplicación Elysia con middlewares, manejo de errores y rutas
 */
const app = new Elysia()
  // Estado de la aplicación
  .state("appName", "Todo List API")
  .state("version", "1.0.0")

  // Aplicar middlewares globales
  .use(requestLogger)
  .use(responseHeaders)
  .use(errorHandler)

  // Ruta raíz
  .get("/", ({ store }) => {
    return {
      message: "🦊 Bienvenido a la API de Todo List con Elysia",
      app: store.appName,
      version: store.version,
      architecture: "Clean Architecture",
      endpoints: {
        "GET /todos": "Obtener todos los todos",
        "GET /todos/:id": "Obtener un todo por ID",
        "POST /todos": "Crear un nuevo todo",
        "PUT /todos/:id": "Actualizar un todo completo",
        "PATCH /todos/:id": "Actualizar parcialmente un todo",
        "PATCH /todos/:id/toggle": "Alternar el estado completado",
        "DELETE /todos/:id": "Eliminar un todo",
      },
    };
  })

  // Registrar rutas del controlador
  .use(container.getTodoRoutesPlugin())

  .listen(3000);

console.log(
  `🦊 Elysia está corriendo en http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📚 Documentación de endpoints disponible en http://localhost:3000`
);
console.log(`🏗️  Arquitectura: Clean Architecture`);
