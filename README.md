# Priority Workspace - Enterprise Task Management

A high-fidelity, responsive Task Management System providing a seamless Kanban and List-based workflow. Built with a focus on performance, scalability, and premium user experience.

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

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

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
