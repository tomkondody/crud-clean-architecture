"""
Health check views
"""

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import connections
from django.db.utils import OperationalError
import logging

logger = logging.getLogger(__name__)

class HealthCheckView(APIView):
    """
    GET /api/v1/health/ - Check API and Database health
    """

    def get(self, request):
        health_status = {
            "status": "healthy",
            "database": "unknown"
        }
        
        db_conn = connections['default']
        try:
            # Try to acquire a connection
            db_conn.cursor()
            health_status["database"] = "connected"
            print("Successfully connected to the database.")
            logger.info("Health check: Database connection is successful.")
        except OperationalError as e:
            health_status["status"] = "unhealthy"
            health_status["database"] = f"disconnected: {str(e)}"
            print(f"Failed to connect to the database: {str(e)}")
            logger.error(f"Health check: Database connection failed: {str(e)}")
            return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        return Response(health_status, status=status.HTTP_200_OK)
