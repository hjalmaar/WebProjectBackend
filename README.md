# Project

**Node.js + Express** application. Health diary application built with chat gpt and the teachers examples. Where you can register and log in. As a authorized user you can search all users but only delete logged in user. Also as an authorized user you can add diary entries, edit and delete. Same is for medication entry. In the bottom user can update their user data. To note the virtual machine is in a subfolder that's why the routes go /api/api. Added route for medications with minimal authorization on server side.


## Bugs and betterments
When updating entry data it will throw an error on screen but will most likely still update the data. The entry table will only update when refreshing the window. The medication data should work without updating. Logout button will throw an error but deletes the token from localstorage.

## Database
This app uses the example database from classes [DataBase.sql](https://github.com/mattpe/hyte-web-dev/blob/main/assets/health-diary-db.sql)


## Resources and endpoints

### `/items` (works with hard-coded mock data only, no need for db)

```http
GET http://127.0.0.1:3000/items
GET http://127.0.0.1:3000/items/:id
DELETE http://127.0.0.1:3000/items/:id

POST http://127.0.0.1:3000/items
content-type: application/json
body: {"name": "New Item"}
```

### `/api/auth`

Example queries:

```http
# Login
POST https://helmar.northeurope.cloudapp.azure.com/api/api/usersusers/login
content-type: application/json
{
  "username": "user",
  "password": "secret"
}

## Get user by token (requires token)
GET http://localhost:3000/api/auth/me
Authorization: Bearer <token>
```

### `/api/users`

Example queries:

```http
# Get all users (requires token)
GET http://127.0.0.1:3000/api/users
Authorization: Bearer <token>

# Get user by id (requires token)
GET http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>

# Delete user (requires token)
DELETE http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>

# Create user (register)
POST http://127.0.0.1:3000/api/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Update user's own data (requires token)
PUT http://127.0.0.1:3000/api/users/
Authorization: Bearer <token>
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}
```

### `/api/entries`

Example queries:

```http
# Get all entries for a logged in user (requires token)
GET http://localhost:3000/api/entries
Authorization: Bearer <token>

# Get entries by id
GET http://localhost:3000/api/entries/:id

# Post entry
POST http://localhost:3000/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Update entry
PUT http://localhost:3000/api/entries/:id
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Delete entry
DELETE http://localhost:3000/api/entries/:id
```
