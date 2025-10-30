# Adopt-A-Friend

An Express.js + EJS web app to help users discover pets and submit adoption requests. Data is stored in MongoDB. Basic login/registration is handled via a simple JSON file for demo purposes.

## Features
- **Pages**: Home, Gallery (Dashboard), About, Contact, Login, Register, Adopt form
- **Adoption form**: Persists to MongoDB collection `adoptions`
- **Basic auth (demo)**: Stores users in `models/users.json`
- **Security & logging**: `helmet`, `morgan`, custom request logger
- **Views**: Server-side rendered with EJS (`views/`)

## Tech Stack
- **Node.js**, **Express**
- **EJS** templating
- **MongoDB** (native driver)
- **helmet**, **cors**, **morgan**, **body-parser**

## Project Structure
```
be/
├─ server.js               # App entry
├─ db.js                   # MongoDB connection (local)
├─ middleware/
│  ├─ loger.js             # Custom request logger
│  └─ handle404.js         # 404 handler
├─ models/
│  ├─ adoption.js          # Adoption model using native MongoDB driver
│  └─ users.json           # Demo user store (file-based)
├─ routes/
│  ├─ pageroute.js         # Page routes + adoption submit
│  └─ authen.js            # Login/Register (file-backed)
├─ views/                  # EJS templates and static images
├─ package.json
└─ README.md
```

## Prerequisites
- Node.js 18+ recommended
- Local MongoDB running at `mongodb://127.0.0.1:27017/adoptafriend`
  - Database name is `adoptafriend` (see `db.js`)

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Ensure MongoDB is running locally
   - Default connection string is hardcoded in `db.js`:
     ```js
     const uri = "mongodb://127.0.0.1:27017/adoptafriend";
     ```
   - Start your mongod service before running the app.
3. Start the server
   ```bash
   npm start
   ```
4. Open
   - http://localhost:3000

## Available Scripts
- `npm start` – start the server on port 3000

## Routes
- GET `/` → Renders `views/index.ejs`
- GET `/dashboard` → Renders `views/gallery.ejs` with list of adoptions from MongoDB
- GET `/about` → Renders `views/blog.ejs`
- GET `/contactus` → Renders `views/contactus.ejs`
- GET `/login` → Renders `views/login.ejs`
- GET `/register` → Renders `views/register.ejs`
- GET `/adopt` → Renders `views/adopt.ejs` (adoption form)
- POST `/submit-adoption` → Saves adoption form to `adoptions` collection
- POST `/login` → Checks credentials against `models/users.json`, redirects to `/dashboard` or `/register`
- POST `/register` → Adds a new user to `models/users.json`, redirects to `/login`

## Data Model (Adoption)
Defined in `models/adoption.js` and stored in `adoptions` collection:
- firstName, lastName, email, phone, altPhone
- address, city, state, zip
- profession
- petName, petType
- experience, homeType
- message
- createdAt, status (default `pending`)

## Middleware
- `middleware/loger.js` – simple console logger
- `morgan` – HTTP request logging
- `helmet` – security headers
- `cors` – Cross-Origin Resource Sharing
- `middleware/handle404.js` – 404 handler (used after routes)

## Error Handling & DB Availability
- On startup, the app tries to connect to MongoDB (`db.js`).
- If DB is unavailable, POST `/submit-adoption` returns a 503 error page.
- A generic error handler returns a friendly error page in production.

## Notes & Limitations
- Auth is file-based and not secure; for production, replace with a proper auth system and hashed passwords.
- MongoDB URI is hardcoded in `db.js`. For flexibility, consider moving to an env var (e.g., `MONGODB_URI`).
- EJS templates also serve static images from `views/` via `express.static`.

## Troubleshooting
- App shows DB error or `/submit-adoption` fails:
  - Ensure MongoDB is running: `mongod` or your OS service manager
  - Confirm the URI in `db.js` matches your setup
- Port already in use:
  - Change `PORT` in `server.js` (default 3000) or free the port
- Changes not reflected:
  - Use a watcher like `nodemon` for auto-reload during development

## License
ISC
