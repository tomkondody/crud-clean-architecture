"""
Repository Interfaces - Define contracts for data operations
Following Dependency Inversion Principle
"""

from abc import ABC, abstractmethod
from typing import List, Optional
from domain.entities.user import User, CreateUserDTO, UpdateUserDTO


class IUserRepository(ABC):
    """Interface for User repository operations"""

    @abstractmethod
    def get_all(self) -> List[User]:
        """Get all users"""
        pass

    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        pass

    @abstractmethod
    def create(self, user_data: CreateUserDTO) -> User:
        """Create a new user"""
        pass

    @abstractmethod
    def update(self, user_data: UpdateUserDTO) -> Optional[User]:
        """Update an existing user"""
        pass

    @abstractmethod
    def delete(self, user_id: int) -> bool:
        """Delete a user by ID"""
        pass

    @abstractmethod
    def exists_by_email(self, email: str, exclude_id: Optional[int] = None) -> bool:
        """Check if user exists by email"""
        pass

    @abstractmethod
    def exists_by_username(self, username: str, exclude_id: Optional[int] = None) -> bool:
        """Check if user exists by username"""
        pass
