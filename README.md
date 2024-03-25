# Project

**Node.js + Express** application. Health diary application built with chat gpt and the teachers examples. Where you can register and log in. As a authorized user you can search all users but only delete logged in user. Also as an authorized user you can add diary entries, edit and delete. Same is for medication entry. In the bottom user can update their user data. In the update user will go through prompts to update their data. To note the virtual machine is in a subfolder that's why the routes go /api/api. Added route for medications with minimal authorization on server side.

Linkki äppiin:

[Linkki](https://helmar.northeurope.cloudapp.azure.com/api/)


## Bugs and betterments
When updating entry data it will throw an error on screen but will most likely still update the data. The entry table will only update when refreshing the window. The medication data should work without updating. Logout button will throw an error but deletes the token from localstorage. Then file structure or lack there of especially on frontend side should be improved.

## Database
This app uses the example database from classes [DataBase.sql](https://github.com/mattpe/hyte-web-dev/blob/main/assets/health-diary-db.sql)
## Screen shots
![image](https://github.com/hjalmaar/WebProjectBackend/assets/77154298/aaf50306-4570-46d7-b4d0-13255b0c462d)
![image](https://github.com/hjalmaar/WebProjectBackend/assets/77154298/923958c0-cc24-41b9-9af0-2dcb2fc2b2c3)
![image](https://github.com/hjalmaar/WebProjectBackend/assets/77154298/989b0227-cb28-4fe2-92b0-22e4f762450a)




## Resources and endpoints

### `/items` (works with hard-coded mock data only, no need for db)

```http
GET https://helmar.northeurope.cloudapp.azure.com/api/items
GET https://helmar.northeurope.cloudapp.azure.com/api/items/:id
DELETE https://helmar.northeurope.cloudapp.azure.com/api/items/:id

POST https://helmar.northeurope.cloudapp.azure.com/api/items/items
content-type: application/json
body: {"name": "New Item"}
```

### `/api/auth`

Example queries:

```http
# Login
POST https://helmar.northeurope.cloudapp.azure.com/api/api/users/login
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
GET https://helmar.northeurope.cloudapp.azure.com/api/api/users
Authorization: Bearer <token>

# Get user by id (requires token)
GET https://helmar.northeurope.cloudapp.azure.com/api/api/users/:id
Authorization: Bearer <token>

# Delete user (requires token)
DELETE https://helmar.northeurope.cloudapp.azure.com/api/api/users/:id
Authorization: Bearer <token>

# Create user (register)
POST https://helmar.northeurope.cloudapp.azure.com/api/api/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Update user's own data (requires token)
PUT https://helmar.northeurope.cloudapp.azure.com/api/api/users
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
GET https://helmar.northeurope.cloudapp.azure.com/api/api/entries
Authorization: Bearer <token>

# Get entries by id
GET https://helmar.northeurope.cloudapp.azure.com/api/api/entries/:id

# Post entry
POST https://helmar.northeurope.cloudapp.azure.com/api/api/entries
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
PUT https://helmar.northeurope.cloudapp.azure.com/api/api/entries/:id
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
DELETE https://helmar.northeurope.cloudapp.azure.com/api/api/entries/:id
```
### `/api/medications`

Example queries:

```http
# Get all medication details for a logged in user (requires token)
GET https://helmar.northeurope.cloudapp.azure.com/api/api/medications
Authorization: Bearer <token>

# Get medication details by id
GET https://helmar.northeurope.cloudapp.azure.com/api/api/medications/:id

# Post medications
POST https://helmar.northeurope.cloudapp.azure.com/api/api/medications
content-type: application/json

{
  "name": "Ibuprofen",
  "dosage": "400mg",
  "frequency": "Every 8 hours",
  "start_date": "2024-03-01",
  "end_date": "2024-03-10",
  "user_id": 1
}

# Update medications
PUT https://helmar.northeurope.cloudapp.azure.com/api/api/medications/:id
content-type: application/json

{
  "name": "Ibuprofen",
  "dosage": "400mg",
  "frequency": "Every 8 hours",
  "start_date": "2024-03-01",
  "end_date": "2024-03-10",
  "user_id": 1
}

# Delete medications
DELETE https://helmar.northeurope.cloudapp.azure.com/api/api/medications/:id
```
