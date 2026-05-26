import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

function ProtectedRoute({ children }) {
  const isAuthenticared = !!localStorage.getItem('token')
  return isAuthenticared? children: <Navigate to="/login" replace />
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route> path="/login" element={<Login />}</Route>
        <Route> path="/register" element={<Register />}</Route>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}