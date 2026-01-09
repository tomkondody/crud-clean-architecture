"""
Django Admin configuration
"""

from django.contrib import admin
from infrastructure.database.models import UserModel


@admin.register(UserModel)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'name', 'created_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('username', 'email', 'name')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
