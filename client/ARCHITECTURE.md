# Clean Architecture Documentation

## Overview

This project implements **Clean Architecture** (also known as Hexagonal Architecture or Ports and Adapters) to create a maintainable, testable, and scalable application.

## Architecture Layers

### 1. Domain Layer (Core Business Logic)
**Location**: `src/domain/`

This is the innermost layer containing the core business logic. It has **NO dependencies** on external frameworks or libraries.

#### Components:

**Entities** (`src/domain/entities/User.ts`)
- Pure TypeScript interfaces representing business objects
- No framework dependencies
- Contains DTOs (Data Transfer Objects) for type safety

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone?: string;
  website?: string;
}
```

**Repository Interfaces** (`src/domain/repositories/IUserRepository.ts`)
- Defines contracts for data operations
- Follows the Dependency Inversion Principle
- Infrastructure layer implements these interfaces

```typescript
export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User>;
  update(user: UpdateUserDTO): Promise<User>;
  delete(id: number): Promise<void>;
}
```

**Use Cases** (`src/domain/usecases/UserUseCases.ts`)
- Contains business logic and validation rules
- Orchestrates data flow between entities and repositories
- Independent of UI and database implementations

```typescript
export class UserUseCases {
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    // Business validation
    if (!userData.email.match(emailRegex)) {
      throw new Error('Invalid email format');
    }
    return await this.userRepository.create(userData);
  }
}
```

### 2. Infrastructure Layer (External Services)
**Location**: `src/infrastructure/`

This layer implements the interfaces defined in the domain layer and handles communication with external services.

#### Components:

**API Client** (`src/infrastructure/api/ApiClient.ts`)
- Singleton pattern for axios instance
- Request/response interceptors
- Centralized error handling
- Easy to swap with different HTTP clients

```typescript
export class ApiClient {
  static getInstance(): AxiosInstance {
    // Returns configured axios instance
  }
}
```

**Repository Implementations** (`src/infrastructure/repositories/UserRepositoryImpl.ts`)
- Concrete implementation of `IUserRepository`
- Handles API communication
- Maps API responses to domain entities
- Can be easily replaced with different data sources (GraphQL, local storage, etc.)

```typescript
export class UserRepositoryImpl implements IUserRepository {
  async getAll(): Promise<User[]> {
    const response = await this.apiClient.get<User[]>('/users');
    return response.data;
  }
}
```

### 3. Presentation Layer (UI)
**Location**: `src/presentation/`

This layer handles user interface and user interactions. It depends on the domain layer but not on the infrastructure layer.

#### Components:

**UserForm** (`src/presentation/components/UserForm.tsx`)
- Handles user input for create/update operations
- Form validation
- Loading states
- Calls use cases through props

**UserList** (`src/presentation/components/UserList.tsx`)
- Displays list of users
- Edit/delete actions
- Confirmation dialogs
- Loading states

### 4. UI Components
**Location**: `src/components/ui/`

Reusable UI components from shadcn/ui:
- Button
- Card
- Dialog
- Input
- Label
- Toast

## Dependency Flow

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (UI)              │
│  ┌─────────────┐      ┌─────────────┐       │
│  │  UserForm   │      │  UserList   │       │
│  └─────────────┘      └─────────────┘       │
└──────────────┬──────────────────────────────┘
               │ depends on
               ▼
┌─────────────────────────────────────────────┐
│          Domain Layer (Core)                 │
│  ┌──────────────┐    ┌──────────────┐       │
│  │   Entities   │    │  Use Cases   │       │
│  └──────────────┘    └──────────────┘       │
│  ┌──────────────────────────────────┐       │
│  │   Repository Interfaces          │       │
│  └──────────────────────────────────┘       │
└──────────────▲──────────────────────────────┘
               │ implements
               │
┌──────────────┴──────────────────────────────┐
│      Infrastructure Layer (External)         │
│  ┌──────────────┐    ┌──────────────┐       │
│  │  API Client  │    │ Repository   │       │
│  │              │    │ Impl         │       │
│  └──────────────┘    └──────────────┘       │
└─────────────────────────────────────────────┘
```

## Dependency Injection

The application uses **constructor injection** for dependency management:

```typescript
// In App.tsx
const userRepository = new UserRepositoryImpl();
const userUseCases = new UserUseCases(userRepository);
```

This allows:
- Easy testing with mock repositories
- Swapping implementations without changing business logic
- Clear dependency graph

## Benefits of This Architecture

### 1. **Testability**
- Each layer can be tested independently
- Easy to mock dependencies
- Business logic isolated from UI and API

### 2. **Maintainability**
- Clear separation of concerns
- Changes in one layer don't affect others
- Easy to understand code organization

### 3. **Flexibility**
- Easy to swap implementations (e.g., REST API → GraphQL)
- Can change UI framework without touching business logic
- Multiple UIs can use the same domain layer

### 4. **Scalability**
- Easy to add new features
- Can grow the application without architectural changes
- Team members can work on different layers independently

### 5. **Dependency Inversion**
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces)
- Follows SOLID principles

## Example: Adding a New Entity

To add a new entity (e.g., Posts), follow these steps:

### 1. Domain Layer
```typescript
// src/domain/entities/Post.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// src/domain/repositories/IPostRepository.ts
export interface IPostRepository {
  getAll(): Promise<Post[]>;
  // ... other methods
}

// src/domain/usecases/PostUseCases.ts
export class PostUseCases {
  constructor(private postRepository: IPostRepository) {}
  // ... business logic
}
```

### 2. Infrastructure Layer
```typescript
// src/infrastructure/repositories/PostRepositoryImpl.ts
export class PostRepositoryImpl implements IPostRepository {
  async getAll(): Promise<Post[]> {
    const response = await this.apiClient.get<Post[]>('/posts');
    return response.data;
  }
}
```

### 3. Presentation Layer
```typescript
// src/presentation/components/PostList.tsx
export function PostList() {
  // Use PostUseCases
}
```

### 4. Wire Up in App
```typescript
const postRepository = new PostRepositoryImpl();
const postUseCases = new PostUseCases(postRepository);
```

## Testing Strategy

### Unit Tests
- **Domain Layer**: Test use cases with mock repositories
- **Infrastructure Layer**: Test repository implementations with mock API
- **Presentation Layer**: Test components with mock use cases

### Integration Tests
- Test the interaction between layers
- Verify data flows correctly

### E2E Tests
- Test complete user workflows
- Verify the entire application works together

## Best Practices Followed

1. ✅ **Single Responsibility Principle**: Each class has one reason to change
2. ✅ **Open/Closed Principle**: Open for extension, closed for modification
3. ✅ **Liskov Substitution Principle**: Implementations can be swapped
4. ✅ **Interface Segregation Principle**: Small, focused interfaces
5. ✅ **Dependency Inversion Principle**: Depend on abstractions, not concretions

## Conclusion

This clean architecture provides a solid foundation for building scalable, maintainable applications. The clear separation of concerns makes it easy to:
- Add new features
- Change implementations
- Test thoroughly
- Onboard new developers
- Scale the application

The architecture is framework-agnostic, meaning the core business logic can be reused across different platforms (web, mobile, desktop) with minimal changes.
