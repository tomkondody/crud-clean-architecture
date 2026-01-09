# Django Backend - User Management API

## Clean Architecture Structure

```
server/
├── domain/              # Business logic layer
│   ├── entities/       # Domain models
│   ├── repositories/   # Repository interfaces
│   └── usecases/       # Business use cases
├── infrastructure/     # External services layer
│   ├── database/      # Database models (Django ORM)
│   └── repositories/  # Repository implementations
├── presentation/      # API layer
│   ├── serializers/   # Request/Response serializers
│   └── views/         # API views
├── config/            # Django configuration
├── manage.py
├── requirements.txt
└── Dockerfile
```

## Technology Stack

- Django 5.0
- Django REST Framework
- PostgreSQL
- Docker & Docker Compose
- CORS Headers

## Setup

See README.md for setup instructions.
