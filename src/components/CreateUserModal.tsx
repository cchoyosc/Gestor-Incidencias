import React, { useState } from "react";
import type { User, UserRole } from "../Users";
import "./UserDetailModal.css";

interface Props {
  onClose: () => void;
  onSave: (user: User) => void;
}

const CreateUserModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [rol, setRol] = useState<UserRole>("mantenimiento");
  const [password, setPassword] = useState("");

const handleSubmit = () => {
  if (!nombre.trim() || !contacto.trim() || !password.trim()) return;

  onSave({
    nombre,
    contacto,
    rol,
  } as any);

  onClose();
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Crear usuario</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-field">
            <span className="modal-label">Nombre</span>
            <input
              className="modal-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre completo"
            />
          </div>
          <div className="modal-field">
  <span className="modal-label">Contacto</span>
  <input
    className="modal-input"
    value={contacto}
    onChange={(e) => setContacto(e.target.value)}
    placeholder="Número de contacto"
  />
</div>
          <div className="modal-field">
            <span className="modal-label">Contraseña</span>
            <input
              className="modal-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <div className="modal-field">
            <span className="modal-label">Rol</span>
            <select
              className="modal-input"
              value={rol}
              onChange={(e) => setRol(e.target.value as UserRole)}
            >
              <option value="admin">Admin</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
        </div>
        <div
          className="modal-footer"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "0 1.2rem 1.2rem",
          }}
        >
          <button className="btn-accion ver" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-accion editar" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;