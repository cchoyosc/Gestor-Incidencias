import React, { useState } from "react";
import ReactDOM from "react-dom";
import type { User, UserRole } from "../Users";
import "./UserDetailModal.css";

interface Props {
  onClose: () => void;
  onSave: (user: User) => Promise<boolean>;
}

const CreateUserModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState<UserRole>("Mantenimiento");
  const [password, setPassword] = useState("");

  const [exito, setExito] = useState(false);
  const [error, setError] = useState(false);
  const [campoFaltante, setCampoFaltante] = useState(false);

  const handleSubmit = async () => {
    if (
      !nombre.trim() ||
      !contacto.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setCampoFaltante(true);
      setTimeout(() => setCampoFaltante(false), 3000);
      return;
    }

    const ok = await onSave({
      nombre,
      contacto,
      email,
      rol,
      password,
    } as any);

    if (ok) {
      setExito(true);
      setTimeout(() => {
        setExito(false);
        onClose();
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <React.Fragment>
      {exito &&
        ReactDOM.createPortal(
          <div className="ci-toast success">
            ✓ Usuario creado correctamente
          </div>,
          document.body,
        )}
      {error &&
        ReactDOM.createPortal(
          <div className="ci-toast error">✕ No se pudo crear el usuario</div>,
          document.body,
        )}
      {campoFaltante &&
        ReactDOM.createPortal(
          <div className="ci-toast error">
            ✕ Por favor completa todos los campos
          </div>,
          document.body,
        )}

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
              <span className="modal-label">Nombre </span>
              <input
                className="modal-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo"
              />
            </div>
            <div className="modal-field">
              <span className="modal-label">Contacto </span>
              <input
                className="modal-input"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                placeholder="Número de contacto"
              />
            </div>
            <div className="modal-field">
              <span className="modal-label">Email </span>
              <input
                className="modal-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email de contacto"
              />
            </div>
            <div className="modal-field">
              <span className="modal-label">Contraseña </span>
              <input
                className="modal-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
            <div className="modal-field">
              <span className="modal-label">Rol </span>
              <select
                className="modal-input"
                value={rol}
                onChange={(e) => setRol(e.target.value as UserRole)}
              >
                <option value="Admin">Admin</option>
                <option value="Mantenimiento">Mantenimiento</option>
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
    </React.Fragment>
  );
};

export default CreateUserModal;
