# Note Sync Backend API

Django REST API backend for the Note Sync application with PostgreSQL database and JWT authentication.

## Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Token Refresh endpoint
- ✅ User Profile Management
- ✅ Complete CRUD operations for Notes
- ✅ PostgreSQL Database
- ✅ API Documentation (Swagger & ReDoc)
- ✅ CORS enabled for React Native frontend

## Prerequisites


- Python 3.8+
- PostgreSQL 12+
- pip and virtualenv

## Setup Instructions

### 1. Database Setup

First, create a PostgreSQL database:

**Option 1: Using psql command line**
```bash
psql postgres
CREATE DATABASE note_sync_db;
CREATE USER note_sync_user WITH PASSWORD 'your_secure_password';
ALTER ROLE note_sync_user SET client_encoding TO 'utf8';
ALTER ROLE note_sync_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE note_sync_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE note_sync_db TO note_sync_user;
\q
```

**Option 2: Using pgAdmin (GUI)**
- Open pgAdmin
- Create a new database named `note_sync_db`
- Create a user `note_sync_user` with appropriate permissions

### 2. Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Activate virtual environment:**
```bash
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows
```

3. **Configure environment variables:**
Edit the `.env` file with your database credentials:
```env
DB_NAME=note_sync_db
DB_USER=note_sync_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432

SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

4. **Run database migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create a superuser (optional, for admin panel):**
```bash
python manage.py createsuperuser
```

6. **Run the development server:**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

- **POST** `/api/auth/register/` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "password": "secure_password",
    "password2": "secure_password",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- **POST** `/api/auth/login/` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password"
  }
  ```

- **POST** `/api/auth/token/refresh/` - Refresh access token
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```

- **GET** `/api/auth/profile/` - Get user profile (requires authentication)
- **PUT/PATCH** `/api/auth/profile/` - Update user profile (requires authentication)

### Notes

All note endpoints require authentication (Bearer token in Authorization header).

- **GET** `/api/notes/` - List all notes (paginated)
- **POST** `/api/notes/` - Create a new note
  ```json
  {
    "title": "Note Title",
    "content": "Note content here"
  }
  ```

- **GET** `/api/notes/{id}/` - Retrieve a specific note
- **PUT/PATCH** `/api/notes/{id}/` - Update a note
- **DELETE** `/api/notes/{id}/` - Delete a note

### API Documentation

- **Swagger UI:** `http://localhost:8000/swagger/`
- **ReDoc:** `http://localhost:8000/redoc/`
- **Admin Panel:** `http://localhost:8000/admin/`

## Authentication Usage

After login/register, you'll receive:
```json
{
  "user": { ... },
  "access": "access_token_here",
  "refresh": "refresh_token_here"
}
```

Include the access token in subsequent requests:
```
Authorization: Bearer <access_token>
```

## Project Structure

```
backend/
├── config/              # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── accounts/            # User authentication app
│   ├── models.py       # Custom User model
│   ├── serializers.py  # User serializers
│   ├── views.py        # Auth views
│   └── urls.py
├── notes/               # Notes management app
│   ├── models.py       # Note model
│   ├── serializers.py  # Note serializers
│   ├── views.py        # Note CRUD views
│   └── urls.py
├── manage.py
├── requirements.txt
├── .env                # Environment variables
└── README.md
```

## Tech Stack

- **Django 4.2.7** - Web framework
- **Django REST Framework** - API framework
- **PostgreSQL** - Database
- **JWT (Simple JWT)** - Authentication
- **django-cors-headers** - CORS support
- **drf-yasg** - API documentation

## Development

### Running Tests
```bash
python manage.py test
```

### Making Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Superuser
```bash
python manage.py createsuperuser
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_NAME | Database name | note_sync_db |
| DB_USER | Database user | note_sync_user |
| DB_PASSWORD | Database password | - |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| SECRET_KEY | Django secret key | - |
| DEBUG | Debug mode | True |
| ALLOWED_HOSTS | Allowed hosts | localhost,127.0.0.1 |
| JWT_ACCESS_TOKEN_LIFETIME | Access token lifetime (minutes) | 60 |
| JWT_REFRESH_TOKEN_LIFETIME | Refresh token lifetime (minutes) | 1440 |

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists

### Migration Issues
```bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

### CORS Issues
- Check CORS_ALLOWED_ORIGINS in settings.py
- Ensure frontend URL is included

## License

MIT License
