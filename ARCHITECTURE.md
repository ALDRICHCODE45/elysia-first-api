# 🏗️ Arquitectura Limpia (Clean Architecture)

Este proyecto está estructurado siguiendo los principios de **Clean Architecture**, también conocida como Arquitectura Hexagonal o Ports and Adapters.

## 📁 Estructura del Proyecto

```
src/
├── domain/                    # Capa de Dominio (Núcleo del negocio)
│   ├── entities/              # Entidades de negocio
│   │   └── Todo.ts
│   ├── repositories/          # Interfaces (contratos)
│   │   └── ITodoRepository.ts
│   └── errors/                # Errores del dominio
│       └── TodoErrors.ts
│
├── application/               # Capa de Aplicación (Casos de uso)
│   ├── usecases/             # Casos de uso
│   │   ├── CreateTodoUseCase.ts
│   │   ├── GetTodosUseCase.ts
│   │   ├── GetTodoByIdUseCase.ts
│   │   ├── UpdateTodoUseCase.ts
│   │   ├── ToggleTodoUseCase.ts
│   │   └── DeleteTodoUseCase.ts
│   ├── dtos/                  # Data Transfer Objects
│   │   ├── CreateTodoDTO.ts
│   │   ├── UpdateTodoDTO.ts
│   │   └── TodoDTO.ts
│   └── mappers/               # Mappers entre entidades y DTOs
│       └── TodoMapper.ts
│
├── infrastructure/            # Capa de Infraestructura
│   ├── repositories/          # Implementaciones de repositorios
│   │   └── InMemoryTodoRepository.ts
│   └── dependency-injection/  # Contenedor de dependencias
│       └── container.ts
│
└── presentation/              # Capa de Presentación (API)
    ├── controllers/           # Controladores HTTP
    │   └── TodoController.ts
    ├── schemas/               # Schemas de validación (Elysia)
    │   └── todoSchemas.ts
    └── middleware/            # Middlewares HTTP
        ├── errorHandler.ts
        ├── requestLogger.ts
        └── responseHeaders.ts
```

## 🎯 Principios de Clean Architecture

### 1. **Separación de Responsabilidades**
Cada capa tiene una responsabilidad específica:
- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Casos de uso, orquestan la lógica de negocio
- **Infrastructure**: Implementaciones concretas (BD, APIs externas, etc.)
- **Presentation**: Interfaz con el mundo exterior (HTTP, CLI, etc.)

### 2. **Inversión de Dependencias**
Las capas superiores no dependen de las inferiores:
- Las **interfaces** (ITodoRepository) están en el dominio
- Las **implementaciones** (InMemoryTodoRepository) están en infraestructura
- Los casos de uso dependen de interfaces, no de implementaciones

### 3. **Independencia del Framework**
- La lógica de negocio es independiente de Elysia
- Podríamos cambiar Elysia por Express, Fastify, etc. sin afectar el dominio
- Solo la capa de presentación depende de Elysia

### 4. **Testabilidad**
- Cada capa puede ser testeada independientemente
- Los casos de uso pueden testearse con repositorios mock
- Las entidades de dominio son funciones puras, fáciles de testear

## 🔄 Flujo de Datos

```
HTTP Request
    ↓
Presentation Layer (TodoController)
    ↓
Application Layer (Use Cases)
    ↓
Domain Layer (Entities + Repository Interface)
    ↓
Infrastructure Layer (Repository Implementation)
    ↓
Data Storage (Memory/DB)
```

## 📦 Dependencias entre Capas

```
Presentation → Application → Domain
                ↓
         Infrastructure → Domain
```

**Regla clave**: Las dependencias siempre apuntan hacia adentro (hacia el dominio).

## 🎓 Beneficios

1. **Mantenibilidad**: Código organizado y fácil de entender
2. **Testabilidad**: Cada componente puede testearse aisladamente
3. **Flexibilidad**: Fácil cambiar implementaciones (BD, framework, etc.)
4. **Escalabilidad**: Fácil agregar nuevas features sin afectar código existente
5. **Independencia del Framework**: La lógica de negocio no depende de tecnologías específicas

## 🔧 Dependency Injection

El contenedor de dependencias (`container.ts`) centraliza la creación de instancias:

- Crea las implementaciones de repositorios
- Inyecta dependencias en los casos de uso
- Inyecta casos de uso en los controladores
- Facilita el testing (puedes crear un container de testing con mocks)

## 📝 Ejemplo de Flujo Completo

### 1. Request HTTP llega
```
POST /todos
Body: { "title": "Aprender Clean Architecture" }
```

### 2. Presentation Layer (TodoController)
- Valida el schema con Elysia
- Llama al caso de uso `CreateTodoUseCase`

### 3. Application Layer (CreateTodoUseCase)
- Valida reglas de negocio
- Crea la entidad `Todo`
- Llama al repositorio para persistir

### 4. Domain Layer (Todo Entity)
- Encapsula la lógica de creación
- Garantiza invariantes (ej: completed = false por defecto)

### 5. Infrastructure Layer (InMemoryTodoRepository)
- Persiste en memoria
- Asigna ID
- Retorna la entidad guardada

### 6. Response
- El caso de uso convierte a DTO
- El controlador formatea la respuesta HTTP
- Se envía al cliente

## 🚀 Próximos Pasos

Para evolucionar esta arquitectura, podrías:

1. **Agregar una base de datos**: Crear `PostgresTodoRepository` en infrastructure
2. **Agregar tests**: Unit tests para cada capa
3. **Agregar validaciones avanzadas**: En la capa de dominio
4. **Agregar eventos de dominio**: Para desacoplar operaciones
5. **Agregar CQRS**: Separar comandos y consultas
6. **Agregar cache**: En la capa de infraestructura

