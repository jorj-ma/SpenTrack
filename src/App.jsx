import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Expenses from "./views/Expenses";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { request } from "./utils/api";

function ProtectedRoute({ children }) {
  const isAuthenticared = !!localStorage.getItem('token')
  return isAuthenticared? children: <Navigate to="/login" replace />
}


export default function App() {
  const [user, setUser] = useState({ name: 'User' }); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch current user data from your API
          const data = await request('/user/profile'); 
          setUser({ name: data.name || data.username }); // Set the global user object
        } catch (err) {
          console.error("Could not fetch user", err);
        }
      }
    };
    fetchUserData();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard user={user}/>
          </ProtectedRoute>
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile user={user} setUser={setUser} />
          </ProtectedRoute>
        }
        />
        <Route path="/expenses" element={
          <ProtectedRoute>
            <Expenses user={user}/>
          </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  )
}
