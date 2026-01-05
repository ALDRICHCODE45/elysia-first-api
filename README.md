# 🦊 Todo List API con Elysia

Una aplicación completa de Todo List con CRUD usando Elysia, el framework web ergonómico y de alto rendimiento para TypeScript.

## 🚀 Características

Esta aplicación demuestra las siguientes características de Elysia:

- ✅ **CRUD Completo**: Create, Read, Update, Delete
- ✅ **Validación de Schemas**: Validación automática con TypeBox
- ✅ **Middlewares Globales**: 
  - `onRequest`: Logging de todas las peticiones
  - `onAfterHandle`: Agregar headers personalizados
  - `onError`: Manejo global de errores
- ✅ **Errores Personalizados**: Clases de error personalizadas con códigos HTTP
- ✅ **Decoradores**: Estado compartido con `decorate` y `state`
- ✅ **Agrupación de Rutas**: Organización con `group`
- ✅ **Type Safety**: End-to-end type safety con TypeScript

## 📦 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
bun run dev
```

El servidor estará disponible en http://localhost:3000

## 📚 Endpoints Disponibles

### Ruta Raíz
- `GET /` - Información de la API y lista de endpoints

### Todo List CRUD
- `GET /todos` - Obtener todos los todos
- `GET /todos/:id` - Obtener un todo por ID
- `POST /todos` - Crear un nuevo todo
- `PUT /todos/:id` - Actualizar un todo completo
- `PATCH /todos/:id` - Actualizar parcialmente un todo
- `PATCH /todos/:id/toggle` - Alternar el estado completado
- `DELETE /todos/:id` - Eliminar un todo

## 🔧 Ejemplos de Uso

### Crear un Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Aprender Elysia", "description": "Estudiar el framework Elysia"}'
```

### Obtener todos los Todos
```bash
curl http://localhost:3000/todos
```

### Actualizar un Todo
```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Alternar estado
```bash
curl -X PATCH http://localhost:3000/todos/1/toggle
```

### Eliminar un Todo
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## 🎓 Conceptos de Elysia Aprendidos

1. **Lifecycle Hooks**: `onRequest`, `onAfterHandle`, `onError`
2. **Validación**: Uso de schemas de TypeBox para validar requests
3. **Decoradores**: Compartir estado y servicios entre rutas
4. **Agrupación**: Organizar rutas relacionadas con `group`
5. **Errores Personalizados**: Crear y manejar errores con códigos HTTP
6. **Type Safety**: Inferencia automática de tipos en todo el ciclo de request/response