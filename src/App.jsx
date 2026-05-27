import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Expenses from "./views/Expenses";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { request } from "./utils/api";

function ProtectedRoute({user, children }) {
  const isAuthenticared = !!localStorage.getItem('token');
  
  if (!isAuthenticared) return <Navigate to="/login" replace />;
    
  return children
}


export default function App() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Fetch current user data from your API
          const data = await request('/user/profile'); 
          setUser({ name: data.name || data.username });
        } catch (err) {
          console.error("Could not fetch user", err);
          console.warn("Session invalid");
          localStorage.removeItem('token');
          setUser(null)
          window.location.href = "/login"
        }
        
      } else {
        setUser(null)
      }
      setLoading(false)
    };
    fetchUserData();
  }, []);
  if (loading) return <div className="p-8">Loading ...</div>;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute setUser={setUser} user={user}>
            <Dashboard setUser={setUser} user={user}/>
          </ProtectedRoute>
        }
        />
        <Route path="/profile" element={
          <ProtectedRoute user={user} setUser={setUser}>
            <Profile user={user} setUser={setUser} />
          </ProtectedRoute>
        }
        />
        <Route path="/expenses" element={
          <ProtectedRoute setUser={setUser} user={user}>
            <Expenses setUser={setUser} user={user}/>
          </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  )
}
