"""
Repository Implementation using Django ORM
Implements IUserRepository interface
"""

from typing import List, Optional
from domain.entities.user import User, CreateUserDTO, UpdateUserDTO
from domain.repositories.user_repository import IUserRepository
from infrastructure.database.models import UserModel


class DjangoUserRepository(IUserRepository):
    """Django ORM implementation of User repository"""

    def _to_entity(self, model: UserModel) -> User:
        """Convert Django model to domain entity"""
        return User(
            id=model.id,
            name=model.name,
            email=model.email,
            username=model.username,
            phone=model.phone,
            website=model.website
        )

    def get_all(self) -> List[User]:
        """Get all users"""
        users = UserModel.objects.all()
        return [self._to_entity(user) for user in users]

    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        try:
            user = UserModel.objects.get(id=user_id)
            return self._to_entity(user)
        except UserModel.DoesNotExist:
            return None

    def create(self, user_data: CreateUserDTO) -> User:
        """Create a new user"""
        user = UserModel.objects.create(
            name=user_data.name,
            email=user_data.email,
            username=user_data.username,
            phone=user_data.phone,
            website=user_data.website
        )
        return self._to_entity(user)

    def update(self, user_data: UpdateUserDTO) -> Optional[User]:
        """Update an existing user"""
        try:
            user = UserModel.objects.get(id=user_data.id)
            
            # Update only provided fields
            if user_data.name is not None:
                user.name = user_data.name
            if user_data.email is not None:
                user.email = user_data.email
            if user_data.username is not None:
                user.username = user_data.username
            if user_data.phone is not None:
                user.phone = user_data.phone
            if user_data.website is not None:
                user.website = user_data.website
            
            user.save()
            return self._to_entity(user)
        except UserModel.DoesNotExist:
            return None

    def delete(self, user_id: int) -> bool:
        """Delete a user by ID"""
        try:
            user = UserModel.objects.get(id=user_id)
            user.delete()
            return True
        except UserModel.DoesNotExist:
            return False

    def exists_by_email(self, email: str, exclude_id: Optional[int] = None) -> bool:
        """Check if user exists by email"""
        queryset = UserModel.objects.filter(email=email)
        if exclude_id:
            queryset = queryset.exclude(id=exclude_id)
        return queryset.exists()

    def exists_by_username(self, username: str, exclude_id: Optional[int] = None) -> bool:
        """Check if user exists by username"""
        queryset = UserModel.objects.filter(username=username)
        if exclude_id:
            queryset = queryset.exclude(id=exclude_id)
        return queryset.exists()
