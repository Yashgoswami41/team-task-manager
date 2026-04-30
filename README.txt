Team Task Manager - Full Stack Web App

Live Application URL:
Add Railway live URL here after deployment

GitHub Repository:
Add GitHub repository link here after upload

Description:
Team Task Manager is a full-stack web application where users can create projects, assign tasks, and track progress with role-based access control. The application supports Admin and Member roles, task assignment, task status updates, dashboard statistics, REST APIs, and database relationships.

Features:
- User signup and login
- Admin and Member roles
- Project creation and project listing
- Task creation and task assignment
- Task status tracking
- Dashboard with project and task statistics
- Role-based access control
- REST API routes
- SQL database integration using Prisma
- Modern responsive UI design

Tech Stack:
- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite for local development
- PostgreSQL for production deployment
- Railway for deployment

User Roles:
Admin:
- Can create projects
- Can create tasks
- Can assign tasks to users
- Can update task status
- Can view dashboard statistics

Member:
- Can view assigned tasks
- Can update assigned task status
- Can view dashboard statistics

Main Pages:
- /signup
- /login
- /dashboard
- /projects
- /tasks

API Routes:
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/projects
- POST /api/projects
- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks
- GET /api/dashboard
- GET /api/users

Database Relationships:
- A user can own many projects
- A project belongs to one user
- A project can have many tasks
- A task belongs to one project
- A task can be assigned to one user

Validations:
- Signup requires name, email, and password
- Login requires email and password
- Project creation requires project name
- Task creation requires title and project
- Task status is restricted to TODO, IN_PROGRESS, and DONE
- Members can update only their assigned tasks
- Admin-only actions are protected on the API level

Local Setup:
1. Install Node.js
2. Download or clone the project
3. Run npm install
4. Create a .env file
5. Add DATABASE_URL and JWT_SECRET
6. Run npx prisma migrate dev
7. Run npm run dev
8. Open http://localhost:3000

Environment Variables:
DATABASE_URL
JWT_SECRET

Demo Login:
Admin:
Email: admin@test.com
Password: 123456

Member:
Email: member@test.com
Password: 123456

Deployment:
The application is prepared for deployment on Railway. For production deployment, PostgreSQL is used as the database and Railway provides the live application URL.

AI Assistance Note:
This project was built with personal effort and guided support from an AI coding tool. The AI tool was used as a learning and development assistant for understanding full-stack structure, debugging errors, improving UI design, and organizing deployment steps. The implementation decisions, testing, customization, and final project preparation were completed through active human involvement.

Using AI support in this project was done in a fair and responsible way. It helped speed up learning, reduce confusion, and improve the quality of the final application. As AI is becoming an important part of the future of software development, this project also reflects how developers can use AI tools productively while still understanding and owning the work they submit.

Conclusion:
Team Task Manager demonstrates a working full-stack application with authentication, database relationships, REST APIs, role-based access control, project management, task assignment, dashboard tracking, and deployment readiness.
