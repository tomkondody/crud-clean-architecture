"""
Domain Entities - Pure Python classes representing business objects
No framework dependencies
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    """User entity - represents a user in the system"""
    id: Optional[int]
    name: str
    email: str
    username: str
    phone: Optional[str] = None
    website: Optional[str] = None

    def __post_init__(self):
        """Validate user data"""
        if not self.name:
            raise ValueError("Name is required")
        if not self.email:
            raise ValueError("Email is required")
        if not self.username:
            raise ValueError("Username is required")
        
        # Email validation
        if '@' not in self.email:
            raise ValueError("Invalid email format")


@dataclass
class CreateUserDTO:
    """Data Transfer Object for creating a user"""
    name: str
    email: str
    username: str
    phone: Optional[str] = None
    website: Optional[str] = None


@dataclass
class UpdateUserDTO:
    """Data Transfer Object for updating a user"""
    id: int
    name: Optional[str] = None
    email: Optional[str] = None
    username: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
