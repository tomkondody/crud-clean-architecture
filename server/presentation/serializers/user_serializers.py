"""
DRF Serializers for API requests/responses
"""

from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    """Serializer for User entity"""
    
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField(max_length=255)
    username = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True, allow_null=True)
    website = serializers.URLField(max_length=200, required=False, allow_blank=True, allow_null=True)


class CreateUserSerializer(serializers.Serializer):
    """Serializer for creating a user"""
    
    name = serializers.CharField(max_length=255, required=True)
    email = serializers.EmailField(max_length=255, required=True)
    username = serializers.CharField(max_length=150, required=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True, allow_null=True)
    website = serializers.URLField(max_length=200, required=False, allow_blank=True, allow_null=True)


class UpdateUserSerializer(serializers.Serializer):
    """Serializer for updating a user"""
    
    name = serializers.CharField(max_length=255, required=False)
    email = serializers.EmailField(max_length=255, required=False)
    username = serializers.CharField(max_length=150, required=False)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True, allow_null=True)
    website = serializers.URLField(max_length=200, required=False, allow_blank=True, allow_null=True)
