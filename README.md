# SpendTrack Frontend

A modern personal finance tracking frontend application built with React and TailwindCSS.

SpendTrack helps users:
- Track expenses
- Monitor spending habits
- Manage monthly budgets
- Visualize financial analytics
- Organize transactions by category

The frontend communicates with the SpendTrack Flask API backend using JWT authentication.

---

# Features

## Authentication
- User registration
- User login
- JWT token handling
- Persistent authenticated sessions

---

## Dashboard Analytics
- Total spending overview
- Remaining budget tracking
- Spending category visualization
- Recent transactions summary

---

## Expense Management
- Create expenses
- Edit expenses
- Delete expenses
- View transaction history

---

## Budget Management
- Update budget limits
- Monitor spending progress

---

## User Profile Management
- Update account details
- Delete user account

---

## Search & Filtering
- Real-time transaction filtering
- Category-based filtering support

---

# Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| React Router DOM | Client-side routing |
| TailwindCSS | Styling |
| Lucide React | Icons |
| Fetch API | Backend communication |
| Vite | Frontend tooling & dev server |

---

# Project Structure

```text
src/
├── components/
│   ├── ExpenseModal.jsx
│   ├── Header.jsx
│   ├── PieChart.jsx
│   └── Sidebar.jsx
│
├── utils/
│   └── api.js
│
├── views/
│   ├── Dashboard.jsx
│   ├── Expenses.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Register.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
cd spentrack-frontend
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

Using yarn:

```bash
yarn install
```

---

# TailwindCSS Setup

Install TailwindCSS and dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize Tailwind:

```bash
npx tailwindcss init -p
```

---

# Running The Application

Start development server:

```bash
npm run dev
```

# API Integration

Frontend communicates with the backend through:

```text
src/utils/api.js
```

Features:
- Centralized API requests
- JWT token handling
- Automatic unauthorized redirects
- Error handling
- Route management

---

# Application Views

| View | Description |
|---|---|
| Login | User authentication |
| Register | User account creation |
| Dashboard | Financial analytics overview |
| Expenses | Expense management |
| Profile | User account settings |

---

# Reusable Components

| Component | Purpose |
|---|---|
| Sidebar | Dashboard navigation |
| Header | Page header & search |
| ExpenseModal | Expense form modal |
| PieChart | Spending analytics visualization |

---

# Authentication

JWT tokens are stored in:

```text
localStorage
```

Protected requests automatically include:

```http
Authorization: Bearer <token>
```

---

# Styling

The application uses:
- TailwindCSS utility classes
- Responsive layouts
- Modern card-based UI patterns
- Custom financial-themed color palette

---

# Future Improvements

- Dark mode support
- Export reports
- Mobile application
- Advanced analytics
- Multi-currency support
- Notifications system
- Recurring expenses
- Data visualization improvements

---

# Author

## George Anzigale

Frontend Developer • Software Developer • Data Enthusiast

---

# Backend Repository

The frontend is designed to work with the SpendTrack Flask backend API.

---

# License

This project is licensed under the MIT License.
