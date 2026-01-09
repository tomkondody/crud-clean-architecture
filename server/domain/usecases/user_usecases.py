"""
Use Cases - Business Logic Layer
Contains all business rules and validation
"""

import re
from typing import List, Optional
from domain.entities.user import User, CreateUserDTO, UpdateUserDTO
from domain.repositories.user_repository import IUserRepository


class UserUseCases:
    """User business logic use cases"""

    def __init__(self, user_repository: IUserRepository):
        self.user_repository = user_repository

    def get_all_users(self) -> List[User]:
        """Get all users"""
        return self.user_repository.get_all()

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        if user_id <= 0:
            raise ValueError("Invalid user ID")
        return self.user_repository.get_by_id(user_id)

    def create_user(self, user_data: CreateUserDTO) -> User:
        """
        Create a new user with business validation
        """
        # Validate required fields
        if not user_data.name or not user_data.name.strip():
            raise ValueError("Name is required")
        
        if not user_data.email or not user_data.email.strip():
            raise ValueError("Email is required")
        
        if not user_data.username or not user_data.username.strip():
            raise ValueError("Username is required")

        # Validate email format
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, user_data.email):
            raise ValueError("Invalid email format")

        # Check for duplicate email
        if self.user_repository.exists_by_email(user_data.email):
            raise ValueError("User with this email already exists")

        # Check for duplicate username
        if self.user_repository.exists_by_username(user_data.username):
            raise ValueError("User with this username already exists")

        # Validate name length
        if len(user_data.name) > 255:
            raise ValueError("Name must be less than 255 characters")

        # Validate username length
        if len(user_data.username) > 150:
            raise ValueError("Username must be less than 150 characters")

        # Validate phone if provided
        if user_data.phone and len(user_data.phone) > 20:
            raise ValueError("Phone must be less than 20 characters")

        # Validate website if provided
        if user_data.website and len(user_data.website) > 200:
            raise ValueError("Website must be less than 200 characters")

        return self.user_repository.create(user_data)

    def update_user(self, user_data: UpdateUserDTO) -> Optional[User]:
        """
        Update an existing user with business validation
        """
        # Check if user exists
        existing_user = self.user_repository.get_by_id(user_data.id)
        if not existing_user:
            return None

        # Validate email if provided
        if user_data.email:
            email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_regex, user_data.email):
                raise ValueError("Invalid email format")
            
            # Check for duplicate email (excluding current user)
            if self.user_repository.exists_by_email(user_data.email, exclude_id=user_data.id):
                raise ValueError("User with this email already exists")

        # Validate username if provided
        if user_data.username:
            if self.user_repository.exists_by_username(user_data.username, exclude_id=user_data.id):
                raise ValueError("User with this username already exists")
            
            if len(user_data.username) > 150:
                raise ValueError("Username must be less than 150 characters")

        # Validate name if provided
        if user_data.name and len(user_data.name) > 255:
            raise ValueError("Name must be less than 255 characters")

        # Validate phone if provided
        if user_data.phone and len(user_data.phone) > 20:
            raise ValueError("Phone must be less than 20 characters")

        # Validate website if provided
        if user_data.website and len(user_data.website) > 200:
            raise ValueError("Website must be less than 200 characters")

        return self.user_repository.update(user_data)

    def delete_user(self, user_id: int) -> bool:
        """Delete a user"""
        if user_id <= 0:
            raise ValueError("Invalid user ID")
        
        # Check if user exists
        existing_user = self.user_repository.get_by_id(user_id)
        if not existing_user:
            return False

        return self.user_repository.delete(user_id)
