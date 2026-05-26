import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route> path="/login" element={<Login/>}</Route>
      </Routes>
    </BrowserRouter>
  )
}