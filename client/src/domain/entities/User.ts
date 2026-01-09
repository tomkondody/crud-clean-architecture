// Domain Entity - User
export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone?: string;
    website?: string;
}

export interface CreateUserDTO {
    name: string;
    email: string;
    username: string;
    phone?: string;
    website?: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
    id: number;
}
