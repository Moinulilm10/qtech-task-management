# Priority Workspace - Enterprise Task Management

A high-fidelity, responsive Task Management System providing a seamless Kanban and List-based workflow. Built with a focus on performance, scalability, and premium user experience.

### 🔗 [Live Demo - qtech-task-management.vercel.app](https://qtech-task-management.vercel.app/)

![Project Overview](file:///Users/roict-m1/.gemini/antigravity/brain/df9cb094-eaf7-40ec-81ae-6616897a136f/filter_functionality_verification_1776059231081.webp)

## 🚀 Key Technical Features

### 🔍 Advanced Search & Optimization

- **Efficient Filtering**: Real-time search with a **400ms debounce** to minimize unnecessary API calls.
- **SQL Robustness**: Backend implementation uses PostgreSQL-specific `ILIKE` for case-insensitive matching and wildcard escaping (`%`, `_`) for secure, accurate queries.
- **Title Scoping**: Search is strategically restricted to task titles to ensure relevance and speed.

### 🎭 Intelligent Board Interaction

- **Dual Perspective**: Toggle seamlessly between a full **Kanban Board** and a condensed **List View**.
- **Status "Focus Mode"**: Advanced filtering system that intelligently hides irrelevant columns and centers the active status, maximizing workspace efficiency.
- **Perspective Sorting**: In List View, categories are dynamically reordered so that populated statuses always appear above empty ones.

### 🧩 Enterprise Component Architecture

- **Reusable UI Primitives**: Enhanced `Input` and `Button` components with shared focus states and icon support.
- **Decoupled Logic**: Search and Filtering logic are encapsulated into specialized components (`SearchBar`, `FilterDropdown`) to ensure a slim, maintainable `TaskDashboard`.
- **Focus Preservation**: Custom event handling (`onMouseDown`) ensures that administrative actions (clearing search, filtering) do not disrupt the user's typing focus.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 + Vite
- **Data Midleware**: Tanstack Query v5 (Optimistic updates & cached states)
- **Styling**: Tailwind CSS v4 (Modern JIT engine)
- **Icons**: Lucide React
- **Utility**: `clsx` & `tailwind-merge` for clean dynamic styling

### Backend

- **Framework**: Laravel 13
- **Database**: PostgreSQL
- **Security**: Sanctum API authentication readiness & CORS-configured middleware

## 🏁 Getting Started

### 1. Prerequisites

- PHP 8.2+
- Node.js 20+
- Composer & NPM

### 2. Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Testing

The project maintains a high level of code quality with full-suite coverage for both backend and frontend.

### Backend (PHP/Pest) - **14/14 Passed**
- **Unit**: Performance of models and logic.
- **Feature**: API endpoints, search validation, and edge cases.
```bash
cd backend
php artisan test
```

### Frontend (React/Vitest) - **15/15 Passed**
- **Unit**: Hooks (`useDebounce`) and Services (`taskService`).
- **Component**: UI rendering and interactions (`TaskCard`, `SearchBar`).
- **Integration**: Dashboard loading, success, and error states.
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Backend (Render)
The backend is optimized for **Render** using Docker and Blueprints.
- **Database**: Managed PostgreSQL.
- **Infrastructure**: Automed via `render.yaml`.
- **Requirements**: Set `DATABASE_URL` and `APP_KEY` in Render dashboard.

### Frontend (Vercel)
The frontend is deployed on **Vercel**.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Requirement**: Set `VITE_API_BASE_URL` to your backend API endpoint.

## 📂 Project Structure

```bash
├── backend/                # Laravel API
│   ├── app/Http/Controllers/TaskController.php  # Optimized search logic
│   └── database/migrations/                     # Task schema
├── frontend/               # React Application
│   ├── src/components/     # Modular UI system
│   │   ├── ui/             # Reusable primitives (Input, Button)
│   │   ├── SearchBar.jsx   # Encapsulated search logic
│   │   └── FilterDropdown.jsx # Custom animated filter
│   ├── src/services/       # API integration layer
│   └── src/hooks/          # Custom hooks (useDebounce)
└── README.md
```

## 📄 License

This project is licensed under the MIT License.

---
