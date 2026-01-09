// Repository Interface - defines contract for data operations
import type { User, CreateUserDTO, UpdateUserDTO } from '../entities/User';

export interface IUserRepository {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User | null>;
    create(user: CreateUserDTO): Promise<User>;
    update(user: UpdateUserDTO): Promise<User>;
    delete(id: number): Promise<void>;
}
