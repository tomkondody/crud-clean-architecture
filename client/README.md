# User Management CRUD Application

A modern, full-featured CRUD (Create, Read, Update, Delete) application built with React, TypeScript, Vite, and shadcn/ui, following clean architecture principles.

## 🚀 Features

- **Clean Architecture**: Separation of concerns with Domain, Infrastructure, and Presentation layers
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Dark Theme**: Premium glassmorphism design with vibrant gradients
- **Type-Safe**: Full TypeScript support
- **API Integration**: Uses JSONPlaceholder API for demo data
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Micro-interactions and fade-in effects
- **Toast Notifications**: User feedback for all actions
- **Form Validation**: Client-side validation with error handling

## 🏗️ Architecture

The project follows **Clean Architecture** principles with three main layers:

### Domain Layer (`src/domain/`)
- **Entities**: Core business models (`User.ts`)
- **Repositories**: Interface definitions (`IUserRepository.ts`)
- **Use Cases**: Business logic (`UserUseCases.ts`)

### Infrastructure Layer (`src/infrastructure/`)
- **API Client**: Axios configuration with interceptors
- **Repository Implementations**: Concrete implementations of repository interfaces

### Presentation Layer (`src/presentation/`)
- **Components**: React components for UI
  - `UserForm`: Create and edit users
  - `UserList`: Display and manage users

## 📦 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Headless UI primitives
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **JSONPlaceholder** - Fake REST API for testing

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## 🚀 Running the Application

### Development Mode
\`\`\`bash
npm run dev
\`\`\`
The application will be available at `http://localhost:5173/`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── domain/                 # Domain layer (business logic)
│   ├── entities/          # Business entities
│   │   └── User.ts
│   ├── repositories/      # Repository interfaces
│   │   └── IUserRepository.ts
│   └── usecases/          # Business use cases
│       └── UserUseCases.ts
├── infrastructure/        # Infrastructure layer (external services)
│   ├── api/              # API configuration
│   │   └── ApiClient.ts
│   └── repositories/     # Repository implementations
│       └── UserRepositoryImpl.ts
├── presentation/         # Presentation layer (UI)
│   └── components/       # React components
│       ├── UserForm.tsx
│       └── UserList.tsx
├── components/           # Shared UI components
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── toast.tsx
│       └── toaster.tsx
├── hooks/               # Custom React hooks
│   └── use-toast.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
\`\`\`

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effect on cards
- **Gradient Backgrounds**: Dynamic purple-to-pink gradients
- **Smooth Animations**: Fade-in effects with staggered delays
- **Hover Effects**: Interactive button and card states
- **Custom Color Palette**: HSL-based color system
- **Inter Font**: Modern, clean typography

## 🔧 Configuration

### Path Aliases
The project uses `@/` as an alias for the `src/` directory:
\`\`\`typescript
import { Button } from '@/components/ui/button'
\`\`\`

### Tailwind CSS
Custom design tokens are defined in `src/index.css` with CSS variables for easy theming.

## 📝 Usage

### Creating a User
1. Fill in the form on the left side
2. Required fields: Name, Email, Username
3. Optional fields: Phone, Website
4. Click "Create User"

### Editing a User
1. Click the edit icon on any user card
2. The form will populate with user data
3. Make changes and click "Update User"
4. Click "Cancel" to discard changes

### Deleting a User
1. Click the delete icon on any user card
2. Confirm deletion in the dialog
3. User will be removed from the list

## 🧪 API Integration

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo purposes. In production, replace the API endpoint in `src/infrastructure/api/ApiClient.ts` with your actual backend URL.

## 🎯 Clean Architecture Benefits

1. **Testability**: Each layer can be tested independently
2. **Maintainability**: Clear separation of concerns
3. **Flexibility**: Easy to swap implementations (e.g., different APIs)
4. **Scalability**: Easy to add new features without affecting existing code
5. **Dependency Inversion**: High-level modules don't depend on low-level modules

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Clean Architecture principles.
