// Implementation of IUserRepository using Django Backend API
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { User, CreateUserDTO, UpdateUserDTO } from '../../domain/entities/User';
import { ApiClient } from '../api/ApiClient';

export class UserRepositoryImpl implements IUserRepository {
    private apiClient = ApiClient.getInstance();
    private endpoint = 'users/';

    async getAll(): Promise<User[]> {
        const response = await this.apiClient.get<User[]>(this.endpoint);
        return response.data;
    }

    async getById(id: number): Promise<User | null> {
        try {
            const response = await this.apiClient.get<User>(`${this.endpoint}${id}/`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async create(user: CreateUserDTO): Promise<User> {
        const response = await this.apiClient.post<User>(this.endpoint, user);
        return response.data;
    }

    async update(user: UpdateUserDTO): Promise<User> {
        const { id, ...userData } = user;
        const response = await this.apiClient.put<User>(`${this.endpoint}${id}/`, userData);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await this.apiClient.delete(`${this.endpoint}${id}/`);
    }
}
