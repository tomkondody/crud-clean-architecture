# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 3: Start Building!
The application is now running with:
- ✅ 10 users loaded from JSONPlaceholder API
- ✅ Full CRUD functionality
- ✅ Beautiful dark theme UI
- ✅ Clean architecture

---

## 📝 Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally before deployment.

### Linting
```bash
npm run lint
```
Run ESLint to check code quality.

---

## 🎯 Quick Feature Guide

### Create a User
1. Fill in the form on the left:
   - **Name** (required)
   - **Email** (required)
   - **Username** (required)
   - **Phone** (optional)
   - **Website** (optional)
2. Click **"Create User"**
3. See the new user appear at the top of the list

### Edit a User
1. Click the **Edit** icon (pencil) on any user card
2. The form will populate with user data
3. Make your changes
4. Click **"Update User"**
5. Or click **"Cancel"** to discard changes

### Delete a User
1. Click the **Delete** icon (trash) on any user card
2. Confirm deletion in the dialog
3. User will be removed from the list

---

## 📁 Project Structure (Simplified)

```
src/
├── domain/              # Business logic (pure TypeScript)
│   ├── entities/       # Data models
│   ├── repositories/   # Interface definitions
│   └── usecases/       # Business rules
│
├── infrastructure/     # External services
│   ├── api/           # API client
│   └── repositories/  # API implementations
│
├── presentation/      # UI components
│   └── components/    # React components
│
├── components/ui/     # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

---

## 🎨 Customization

### Change API Endpoint
Edit `src/infrastructure/api/ApiClient.ts`:
```typescript
baseURL: 'https://your-api.com',
```

### Modify Theme Colors
Edit `src/index.css`:
```css
:root {
  --primary: 263 70% 50%;  /* Purple */
  --background: 222.2 84% 4.9%;  /* Dark blue */
  /* ... other colors */
}
```

### Add New Fields to User
1. Update `src/domain/entities/User.ts`
2. Update `src/presentation/components/UserForm.tsx`
3. Update `src/presentation/components/UserList.tsx`

---

## 🔧 Common Tasks

### Add a New Entity (e.g., Posts)

1. **Create Domain Layer**
   ```typescript
   // src/domain/entities/Post.ts
   export interface Post {
     id: number;
     title: string;
     body: string;
   }
   ```

2. **Create Repository Interface**
   ```typescript
   // src/domain/repositories/IPostRepository.ts
   export interface IPostRepository {
     getAll(): Promise<Post[]>;
   }
   ```

3. **Create Use Cases**
   ```typescript
   // src/domain/usecases/PostUseCases.ts
   export class PostUseCases {
     constructor(private postRepository: IPostRepository) {}
   }
   ```

4. **Implement Repository**
   ```typescript
   // src/infrastructure/repositories/PostRepositoryImpl.ts
   export class PostRepositoryImpl implements IPostRepository {
     async getAll(): Promise<Post[]> {
       const response = await this.apiClient.get('/posts');
       return response.data;
     }
   }
   ```

5. **Create UI Components**
   ```typescript
   // src/presentation/components/PostList.tsx
   export function PostList() {
     // Component logic
   }
   ```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Kill the process using the port
# Or change the port in vite.config.ts
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check TypeScript version
npx tsc --version

# Rebuild TypeScript cache
npm run build
```

---

## 📚 Learn More

- **Clean Architecture**: See `ARCHITECTURE.md`
- **Project Details**: See `PROJECT_SUMMARY.md`
- **Full Documentation**: See `README.md`

---

## 🎉 You're All Set!

The application is ready to use. Start creating, editing, and deleting users!

For questions or issues, refer to the documentation files in the project root.

Happy coding! 🚀
