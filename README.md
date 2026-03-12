# TaskFlow Kanban Board

A modern **full-stack Kanban task management application** built using the **MEVN stack (MongoDB, Express.js, Vue 3, Node.js)**.
The application allows users to create tasks and move them across columns using **drag-and-drop**, with all updates synchronized in real time with the backend database.

---

# Project Overview

TaskFlow Kanban is a productivity tool inspired by task boards used in professional project management software.
Users can manage tasks across three stages:

* **To Do**
* **In Progress**
* **Done**

The project demonstrates:

* Modular Vue 3 component architecture
* RESTful backend API design
* MongoDB database integration
* Drag-and-drop UI interactions
* Clean separation between frontend and backend

---

# Tech Stack

## Frontend

* Vue 3 (Composition API)
* Vite
* TailwindCSS
* Axios
* VueDraggable (SortableJS)

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

# Project Structure

```
kanban/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── KanbanBoard.vue
    │   │   ├── TaskColumn.vue
    │   │   ├── TaskCard.vue
    │   │   └── TaskModal.vue
    │   ├── composables/
    │   │   └── useTasks.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.vue
    │   └── main.js
    ├── vite.config.js
```

---

# Installation and Setup

## 1. Clone the Repository

```
git clone <your-repository-url>
cd kanban
```

---

# Backend Setup

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kanban
```

Start the backend server:

```
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

Test API:

```
http://localhost:5000/api/tasks
```

---

# Frontend Setup

Open a new terminal and navigate to the frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Database Setup

Ensure MongoDB is running locally.

Default connection:

```
mongodb://localhost:27017/kanban
```

MongoDB will automatically create:

```
Database: kanban
Collection: tasks
```

---

# Seeding the Database

Insert sample tasks using **MongoDB Compass** or MongoDB shell.

Example records:

```
{
"title": "Setup Backend API",
"description": "Create Express server and MongoDB connection",
"status": "todo"
}
```

```
{
"title": "Build Kanban UI",
"description": "Create Vue components for board",
"status": "in-progress"
}
```

```
{
"title": "Test Drag and Drop",
"description": "Ensure task status updates in database",
"status": "done"
}
```

After inserting tasks, refresh the frontend to see them on the board.

---

# API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | /api/tasks            | Fetch all tasks     |
| POST   | /api/tasks            | Create new task     |
| PUT    | /api/tasks/:id        | Update task details |
| PATCH  | /api/tasks/:id/status | Update task status  |
| DELETE | /api/tasks/:id        | Delete task         |

---

# Data Flow Between Frontend and Backend

The application follows a **client-server architecture** where the Vue frontend communicates with the Node.js backend through REST APIs.

### Step 1 – Fetch Tasks

When the Kanban board loads, the Vue component sends a request:

```
GET /api/tasks
```

The backend retrieves task documents from MongoDB and returns them as JSON.

---

### Step 2 – Render Tasks

The frontend groups tasks based on their **status field**:

* todo
* in-progress
* done

Each group is rendered inside its respective column.

---

### Step 3 – Drag and Drop

When a task card is moved to another column:

1. The Vue UI updates immediately.
2. The frontend sends a request:

```
PATCH /api/tasks/:id/status
```

Example body:

```
{
"status": "done"
}
```

---

### Step 4 – Backend Update

The backend controller updates the task document in MongoDB using Mongoose.

---

### Step 5 – UI Synchronization

After updating the database, the frontend refreshes its state so the UI reflects the new task status.

---

# Features

* Create new tasks
* Edit tasks
* Delete tasks
* Drag and drop tasks between columns
* Real-time status updates
* Responsive modern UI

---

# Future Improvements

* Task priority levels
* User authentication
* Real-time updates with WebSockets
* Dark mode UI

---


# Author

Full Stack Developer Intern Assignment – MEVN Stack