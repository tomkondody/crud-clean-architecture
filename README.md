# Full Stack User Management Application

A complete CRUD application with **React + TypeScript frontend** and **Django REST API backend**, both following **Clean Architecture** principles, containerized with **Docker**.

## 🏗️ Architecture Overview

```
├── client/                 # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── domain/        # Business logic (entities, repositories, use cases)
│   │   ├── infrastructure/# External services (API client, repository implementations)
│   │   ├── presentation/  # UI components
│   │   └── components/ui/ # shadcn/ui components
│   └── Dockerfile
│
├── server/                # Django REST API backend
│   ├── domain/           # Business logic (entities, repositories, use cases)
│   ├── infrastructure/   # External services (database, repository implementations)
│   ├── presentation/     # API layer (serializers, views)
│   ├── config/           # Django configuration
│   └── Dockerfile
│
└── docker-compose.yml    # Orchestrates all services
```

## 📋 API Endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation.

**Base URL**: `http://localhost:8000/api/v1`

- `GET /users/` - List all users
- `POST /users/` - Create a new user
- `GET /users/{id}/` - Get user by ID
- `PUT /users/{id}/` - Update user (full)
- `PATCH /users/{id}/` - Update user (partial)
- `DELETE /users/{id}/` - Delete user

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### 1. Clone and Navigate
```bash
cd "f:/New folder"
```

### 2. Start All Services
```bash
docker-compose up --build
```

This will start:
- **PostgreSQL** database on port `5432`
- **Django backend** on port `8000`
- **React frontend** on port `5173`

### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api/v1/users/
- **Django Admin**: http://localhost:8000/admin
  - Username: `admin`
  - Password: `admin123`

### 4. Stop Services
```bash
docker-compose down
```

### 5. Stop and Remove Volumes
```bash
docker-compose down -v
```

---

## 🛠️ Manual Setup (Without Docker)

### Backend Setup

#### 1. Navigate to Server Directory
```bash
cd server
```

#### 2. Create Virtual Environment
```bash
python -m venv venv
```

#### 3. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

#### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 5. Set Up PostgreSQL
Install PostgreSQL and create a database:
```sql
CREATE DATABASE userdb;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE userdb TO postgres;
```

#### 6. Update .env File
Edit `server/.env` with your database credentials.

#### 7. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 8. Create Superuser
```bash
python manage.py createsuperuser
```

#### 9. Run Development Server
```bash
python manage.py runserver
```

Backend will be available at http://localhost:8000

---

### Frontend Setup

#### 1. Navigate to Client Directory
```bash
cd client
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Create .env File
Create `client/.env.local`:
```
VITE_API_URL=http://localhost:8000/api/v1
```

#### 4. Run Development Server
```bash
npm run dev
```

Frontend will be available at http://localhost:5173

---

## 🏛️ Clean Architecture

Both frontend and backend follow Clean Architecture principles:

### Layers

1. **Domain Layer** (Core Business Logic)
   - Entities: Pure data models
   - Repository Interfaces: Contracts for data operations
   - Use Cases: Business rules and validation

2. **Infrastructure Layer** (External Services)
   - Database Models (Django ORM)
   - API Client (Axios)
   - Repository Implementations

3. **Presentation Layer** (UI/API)
   - React Components (Frontend)
   - DRF Views & Serializers (Backend)

### Benefits
- ✅ Testable: Each layer can be tested independently
- ✅ Maintainable: Clear separation of concerns
- ✅ Flexible: Easy to swap implementations
- ✅ Scalable: Easy to add new features

---

## 🧪 Testing

### Backend Tests
```bash
cd server
python manage.py test
```

### Frontend Tests
```bash
cd client
npm run test
```

---

## 📦 Technology Stack

### Frontend
- React 19
- TypeScript 5.9
- Vite 7.3
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- Django 5.0
- Django REST Framework
- PostgreSQL 15
- Python 3.11

### DevOps
- Docker
- Docker Compose
- Gunicorn

---

## 🔧 Development

### Backend Development

#### Add a New Endpoint
1. Create entity in `domain/entities/`
2. Create repository interface in `domain/repositories/`
3. Create use case in `domain/usecases/`
4. Create Django model in `infrastructure/database/models.py`
5. Create repository implementation in `infrastructure/repositories/`
6. Create serializer in `presentation/serializers/`
7. Create view in `presentation/views/`
8. Add URL in `presentation/urls.py`

#### Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Frontend Development

#### Add a New Feature
1. Create entity in `domain/entities/`
2. Create repository interface in `domain/repositories/`
3. Create use case in `domain/usecases/`
4. Create repository implementation in `infrastructure/repositories/`
5. Create React component in `presentation/components/`
6. Wire up in `App.tsx`

---

## 🐳 Docker Commands

### Build Images
```bash
docker-compose build
```

### Start Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

### Remove Volumes
```bash
docker-compose down -v
```

### Rebuild and Start
```bash
docker-compose up --build
```

### Access Backend Container
```bash
docker exec -it userdb_backend bash
```

### Access Database Container
```bash
docker exec -it userdb_postgres psql -U postgres -d userdb
```

---

## 📝 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=userdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🚀 Production Deployment

### Backend
1. Set `DEBUG=False` in `.env`
2. Generate a secure `SECRET_KEY`
3. Update `ALLOWED_HOSTS`
4. Use a production database
5. Collect static files: `python manage.py collectstatic`
6. Use Gunicorn or uWSGI
7. Set up Nginx as reverse proxy

### Frontend
1. Build production bundle: `npm run build`
2. Serve `dist/` folder with Nginx or similar
3. Update `VITE_API_URL` to production API URL

---

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Backend Architecture](./server/README.md)
- [Frontend README](./client/README.md)
- [Frontend Architecture](./client/ARCHITECTURE.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ using Clean Architecture principles

---

## 🎯 Next Steps

- [ ] Add authentication (JWT)
- [ ] Add pagination
- [ ] Add filtering and search
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add CI/CD pipeline
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add logging and monitoring
- [ ] Add rate limiting
- [ ] Deploy to production
