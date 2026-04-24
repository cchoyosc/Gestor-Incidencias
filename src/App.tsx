import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Users from "./Users";
import CrearIncidencia from "./CrearIncidencia";
import IncidenciasMantenimiento from "./IncidenciasMantenimiento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mantenimiento" element={<IncidenciasMantenimiento />} />
        <Route path="/crear-incidencia" element={<CrearIncidencia />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
