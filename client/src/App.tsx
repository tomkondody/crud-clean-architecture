import { useState, useEffect } from 'react';
import type { User, CreateUserDTO, UpdateUserDTO } from '@/domain/entities/User';
import { UserUseCases } from '@/domain/usecases/UserUseCases';
import { UserRepositoryImpl } from '@/infrastructure/repositories/UserRepositoryImpl';
import { UserList } from '@/presentation/components/UserList';
import { UserForm } from '@/presentation/components/UserForm';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

// Dependency Injection
const userRepository = new UserRepositoryImpl();
const userUseCases = new UserUseCases(userRepository);

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await userUseCases.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: CreateUserDTO) => {
    try {
      const newUser = await userUseCases.createUser(userData);
      setUsers([newUser, ...users]);
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleUpdateUser = async (userData: UpdateUserDTO) => {
    try {
      const updatedUser = await userUseCases.updateUser(userData);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      setSelectedUser(null);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userUseCases.deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handleSubmit = async (userData: CreateUserDTO | UpdateUserDTO) => {
    if (selectedUser && 'id' in userData) {
      await handleUpdateUser(userData as UpdateUserDTO);
    } else {
      await handleCreateUser(userData as CreateUserDTO);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground text-lg">
            A modern CRUD application with clean architecture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Form */}
          <div className="lg:col-span-1">
            <UserForm
              user={selectedUser}
              onSubmit={handleSubmit}
              onCancel={handleCancelEdit}
            />
          </div>

          {/* User List */}
          <div className="lg:col-span-2">
            <UserList
              users={users}
              isLoading={isLoading}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
