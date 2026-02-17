# TaskBoard

TaskBoard is a modern, interactive task management application built with **React** and **Vite**. It features a Kanban-style board with drag-and-drop functionality, allowing users to organize tasks efficiently across different stages.

<div align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-blue" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.3.1-646CFF" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC" alt="Tailwind CSS" />
</div>

## ✨ Features

- **Drag & Drop Interface**: Effortlessly move tasks between columns using `@hello-pangea/dnd`.
- **Task Management**: Create, edit, and delete tasks with ease.
- **Filtering & Search**:
  - Filter tasks by priority (High, Medium, Low).
  - Real-time search by task title.
- **Sorting**: Sort tasks by due date to stay on top of deadlines.
- **Responsive Design**: precise styling with **Tailwind CSS** for a clean look on any device.
- **Authentication**: Includes a basic authentication context for user login/logout flows.
- **Activity Log**: View recent board activities and changes.
- **Data Persistence**: (Note: Check implementation for local storage or backend integration details).

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `date-fns` for date manipulation, `uuid` for unique identifiers.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher recommended).
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd task-board
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## 📜 Scripts

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Builds the production-ready application.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 📂 Project Structure

```
src/
├── components/       # UI Components (Board, TaskCard, TaskForm, Login)
├── context/          # React Contexts (AuthContext, BoardContext)
├── App.jsx           # Main application entry point with Routing
└── index.css         # Global styles and Tailwind directives
```