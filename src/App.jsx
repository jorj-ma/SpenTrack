import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Expenses from "./views/Expenses";

function ProtectedRoute({ children }) {
  const isAuthenticared = !!localStorage.getItem('token')
  return isAuthenticared? children: <Navigate to="/login" replace />
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }
        />
        <Route path="/expenses" element={
          <ProtectedRoute>
            <Expenses/>
          </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  )
}
