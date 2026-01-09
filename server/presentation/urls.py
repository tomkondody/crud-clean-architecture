"""
URL Configuration for User API
"""

from django.urls import path
from presentation.views.user_views import UserListView, UserDetailView
from presentation.views.health_views import HealthCheckView

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
