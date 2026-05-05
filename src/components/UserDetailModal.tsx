import React from "react";
import type { User } from "../Users";
import "./UserDetailModal.css";

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetailModal: React.FC<Props> = ({ user, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Detalle de usuario</span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-field">
            <span className="modal-label">ID</span>
            <span className="modal-value">{user.id}</span>
          </div>
          <div className="modal-field">
            <span className="modal-label">Nombre</span>
            <span className="modal-value">{user.nombre}</span>
          </div>
          <div className="modal-field">
            <span className="modal-label">Contacto</span>
            <span className="modal-value">{user.contacto}</span>
          </div>
          <div className="modal-field">
            <span className="modal-label">Email</span>
            <span className="modal-value">{user.email}</span>
          </div>
          <div className="modal-field">
            <span className="modal-label">Rol</span>
            <span className={`rol-badge ${user.rol_id}`}>
              {user.rol_id === "R1" ? "Admin" : "Mantenimiento"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
