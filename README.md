# Team Task Manager - Full Stack Web App

Team Task Manager is a full-stack web application where users can create projects, assign tasks, and track progress with role-based access control.

## Features

- User signup and login
- Admin and Member roles
- Project creation and listing
- Task creation and assignment
- Task status tracking
- Dashboard with project and task statistics
- REST APIs
- SQL database integration using Prisma
- Modern responsive UI design

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite for local development
- PostgreSQL for production deployment
- Railway for deployment

## User Roles

Admin:
- Create projects
- Create tasks
- Assign tasks to users
- Update task status
- View dashboard statistics

Member:
- View assigned tasks
- Update assigned task status
- View dashboard statistics

## Main Pages

- `/signup`
- `/login`
- `/dashboard`
- `/projects`
- `/tasks`

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks`
- `GET /api/dashboard`
- `GET /api/users`

## Database Relationships

- A user can own many projects
- A project belongs to one user
- A project can have many tasks
- A task belongs to one project
- A task can be assigned to one user

## Local Setup

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

```env
DATABASE_URL=
JWT_SECRET=
```

## Demo Login

Admin:

```text
Email: admin@test.com
Password: 123456
```

Member:

```text
Email: member@test.com
Password: 123456
```

## Deployment

This project is prepared for deployment on Railway with PostgreSQL as the production database.

## Developer Note

This project was developed with my own effort along with guided support from an AI coding assistant. The AI tool was used as a learning and productivity support system to understand the full-stack structure, debug errors, improve the UI design, and organize deployment steps.

I actively worked on the project by testing features, fixing issues, customizing the design, understanding the code flow, and preparing the final submission. The use of AI support was done in a fair and responsible way, similar to how modern developers use documentation, tutorials, and development tools to improve their workflow.

As AI is becoming an important part of the future of software development, this project also reflects how AI can support learning and development while still requiring human understanding, decision-making, and ownership.
