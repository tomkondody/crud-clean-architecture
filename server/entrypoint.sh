#!/bin/bash

# Wait for database if DATABASE_URL is not set (assuming local 'db' container)
if [ -z "$DATABASE_URL" ]; then
  echo "Waiting for local PostgreSQL..."
  while ! nc -z db 5432; do
    sleep 0.1
  done
  echo "Local PostgreSQL started"
fi

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "Creating superuser..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created')
else:
    print('Superuser already exists')
END

# Start server
echo "Starting server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
