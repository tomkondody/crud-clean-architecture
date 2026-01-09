"""
API Views using Django REST Framework
Presentation layer - handles HTTP requests/responses
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from dataclasses import asdict

from domain.entities.user import CreateUserDTO, UpdateUserDTO
from domain.usecases.user_usecases import UserUseCases
from infrastructure.repositories.django_user_repository import DjangoUserRepository
from presentation.serializers.user_serializers import (
    UserSerializer,
    CreateUserSerializer,
    UpdateUserSerializer
)


# Dependency Injection
user_repository = DjangoUserRepository()
user_usecases = UserUseCases(user_repository)


class UserListView(APIView):
    """
    GET /api/v1/users/ - List all users
    POST /api/v1/users/ - Create a new user
    """

    def get(self, request):
        """Get all users"""
        try:
            users = user_usecases.get_all_users()
            # Convert domain entities to dicts
            users_data = [asdict(user) for user in users]
            serializer = UserSerializer(users_data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        """Create a new user"""
        serializer = CreateUserSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create DTO from validated data
            user_data = CreateUserDTO(**serializer.validated_data)
            
            # Execute use case
            user = user_usecases.create_user(user_data)
            
            # Return created user
            user_dict = asdict(user)
            response_serializer = UserSerializer(user_dict)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserDetailView(APIView):
    """
    GET /api/v1/users/{id}/ - Get user by ID
    PUT /api/v1/users/{id}/ - Update user
    PATCH /api/v1/users/{id}/ - Partial update user
    DELETE /api/v1/users/{id}/ - Delete user
    """

    def get(self, request, pk):
        """Get user by ID"""
        try:
            user = user_usecases.get_user_by_id(pk)
            
            if not user:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            user_dict = asdict(user)
            serializer = UserSerializer(user_dict)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request, pk):
        """Full update of user"""
        serializer = CreateUserSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create DTO with all fields
            user_data = UpdateUserDTO(id=pk, **serializer.validated_data)
            
            # Execute use case
            user = user_usecases.update_user(user_data)
            
            if not user:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            user_dict = asdict(user)
            response_serializer = UserSerializer(user_dict)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def patch(self, request, pk):
        """Partial update of user"""
        serializer = UpdateUserSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create DTO with only provided fields
            user_data = UpdateUserDTO(id=pk, **serializer.validated_data)
            
            # Execute use case
            user = user_usecases.update_user(user_data)
            
            if not user:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            user_dict = asdict(user)
            response_serializer = UserSerializer(user_dict)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        """Delete user"""
        try:
            deleted = user_usecases.delete_user(pk)
            
            if not deleted:
                return Response(
                    {"detail": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except ValueError as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
