# Quick Setup Guide for Note Sync Backend

## 🚀 Quick Start (3 Steps)

### Step 1: Create PostgreSQL Database

Choose one option:

**Option A - Command Line (Recommended):**
```bash
psql postgres
CREATE DATABASE note_sync_db;
CREATE USER note_sync_user WITH PASSWORD 'mypassword123';
GRANT ALL PRIVILEGES ON DATABASE note_sync_db TO note_sync_user;
\q
```

**Option B - pgAdmin GUI:**
1. Open pgAdmin
2. Right-click "Databases" → Create → Database
3. Name it: `note_sync_db`
4. Create user with permissions

### Step 2: Configure Environment Variables

Edit the `.env` file in the backend folder:

```env
DB_NAME=note_sync_db
DB_USER=note_sync_user
DB_PASSWORD=mypassword123
DB_HOST=localhost
DB_PORT=5432

SECRET_KEY=django-insecure-hxda8*mawq$hop5cc2q7tu_um6(nq(cqr3803hemvb7wgx*pco
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

⚠️ **Important:** Change `DB_PASSWORD` to match the password you set in Step 1!

### Step 3: Run Migrations and Start Server

```bash
cd backend
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

✅ **Done!** Your API is now running at `http://localhost:8000`

---

## 📝 Test Your API

### Test Registration:
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "TestPass123!",
    "password2": "TestPass123!",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### View API Documentation:
- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/
- Admin Panel: http://localhost:8000/admin/

---

## 🎯 API Endpoints Summary

### Authentication (No token 

required)
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/token/refresh/` - Refresh access token

### User Profile (Token required)
- `GET /api/auth/profile/` - Get profile
- `PUT /api/auth/profile/` - Update profile

### Notes (Token required)
- `GET /api/notes/` - List all notes
- `POST /api/notes/` - Create note
- `GET /api/notes/{id}/` - Get note
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note

---

## 🔧 Optional: Create Admin User

```bash
python manage.py createsuperuser
```

Then access admin panel at: http://localhost:8000/admin/

---

## ❓ Troubleshooting

### "connection refused" error?
- Make sure PostgreSQL is running
- Check database credentials in `.env`

### "No module named 'decouple'" error?
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Migration errors?
```bash
python manage.py makemigrations
python manage.py migrate --run-syncdb
```

---

## 📱 Connect to React Native Frontend

Your frontend should use these URLs:
- Base URL: `http://localhost:8000`
- Register: `POST /api/auth/register/`
- Login: `POST /api/auth/login/`
- Notes: `GET/POST /api/notes/`

Include JWT token in headers:
```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
}
```
