import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import UserDetailModal from "./components/UserDetailModal";
import EditUserModal from "./components/EditUserModal";
import CreateUserModal from "./components/CreateUserModal";
import "./Dashboard.css";
import { useUsers } from "./hooks/useUsers";

export type UserRole = "admin" | "mantenimiento";

export interface User {
  id: number;
  nombre: string;
  identificacion: string;
  rol: UserRole;
  password: string;
}

const Users = () => {
  const { users, loading, removeUser, editUser, addUser } = useUsers();
  const [editUserData, setEditUserData] = useState<User | null>(null);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (loading) return <p>Cargando...</p>;

  const handleDelete = (id: number) => {
    removeUser(id);
  };

  const handleSave = (updated: User) => {
    editUser(updated);
    setEditUserData(null);
  };

  return (
    <div className="dashboard-root d-flex">
      <Sidebar />
      <div className="dashboard-main d-flex flex-column">
        <TopBar />
        <div className="dashboard-content flex-grow-1 p-4">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "#333",
                margin: 0,
              }}
            >
              Usuarios
            </h2>
            <button
              className="btn-accion editar"
              onClick={() => setShowCreateModal(true)}
            >
              + Crear usuario
            </button>
          </div>

          <div className="tabla-wrapper">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Identificación</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.identificacion}</td>
                    <td>
                      <span className={`rol-badge ${user.rol}`}>
                        {user.rol}
                      </span>
                    </td>
                    <td>
                      <div className="acciones">
                        <button
                          className="btn-accion ver"
                          onClick={() => setDetailUser(user)}
                        >
                          Ver
                        </button>
                        <button
                          className="btn-accion editar"
                          onClick={() => setEditUserData(user)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn-accion eliminar"
                          onClick={() => handleDelete(user.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {detailUser && (
        <UserDetailModal
          user={detailUser}
          onClose={() => setDetailUser(null)}
        />
      )}
      {editUserData && (
        <EditUserModal
          user={editUserData}
          onClose={() => setEditUserData(null)}
          onSave={handleSave}
        />
      )}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSave={(newUser) => {
            addUser(newUser);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Users;
