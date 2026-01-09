// Use Cases - Business Logic Layer
import type { User, CreateUserDTO, UpdateUserDTO } from '../entities/User';
import type { IUserRepository } from '../repositories/IUserRepository';

export class UserUseCases {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.getById(id);
    }

    async createUser(userData: CreateUserDTO): Promise<User> {
        // Business logic validation can go here
        if (!userData.name || !userData.email || !userData.username) {
            throw new Error('Name, email, and username are required');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            throw new Error('Invalid email format');
        }

        return await this.userRepository.create(userData);
    }

    async updateUser(userData: UpdateUserDTO): Promise<User> {
        // Validate email if provided
        if (userData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                throw new Error('Invalid email format');
            }
        }

        return await this.userRepository.update(userData);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.delete(id);
    }
}
