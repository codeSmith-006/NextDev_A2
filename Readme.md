# DevPulse

DevPulse is a simple issue tracking API where teams can report bugs, request features, and manage development tasks collaboratively.

## Live URL

https://next-dev-a2.vercel.app

---

## Features

- User authentication with JWT
- Role-based access (Contributor & Maintainer)
- Create and manage issues
- Update issue status
- Filter and sort issues
- Secure password hashing with bcrypt
- Raw SQL with PostgreSQL

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- bcrypt

---

## Setup Instructions

### Clone the project

```bash
git clone https://github.com/codeSmith-006/NextDev_A2
cd devpulse
```

### Install dependencies

```bash
npm install
```

### Create `.env` file

```env
DB_CS=postgresql://neondb_owner:npg_NgoeHWUG3TA6@ep-plain-salad-aq1zd7rj-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require
PORT=5000
JWT_SECRET=723498ifowyef987w9ef780wef0w9w87ef
```

### Run the server

```bash
npm run dev
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |

### Issue Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/issues` | Create issue |
| GET | `/api/issues` | Get all issues |
| GET | `/api/issues/:id` | Get single issue |
| PATCH | `/api/issues/:id` | Update issue |
| DELETE | `/api/issues/:id` | Delete issue |

---

## Database Schema Summary

### users

- id
- name
- email
- password
- role
- created_at
- updated_at

### issues

- id
- title
- description
- type
- status
- reporter_id
- created_at
- updated_at

---

## User Roles

### Contributor
- Create issues
- View issues

### Maintainer
- Update any issue
- Delete issues
- Manage issue status

---

## Author

Ryan Rehan
```