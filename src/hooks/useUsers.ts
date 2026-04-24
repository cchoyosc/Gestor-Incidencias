import { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../service/api";
import axios from "axios";
export const useUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

 const addUser = async (user: any) => {
  try {
    const res = await axios.post("http://localhost:3000/usuarios", {
      nombre: user.nombre,
      contacto: user.contacto,
      rol_id: user.rol === "admin" ? "R1" : "R2",
    });

    setUsers((prev) => [...prev, res.data]);

  } catch (error) {
    console.error("ERROR BACKEND:", error);
  }
};
  const editUser = async (user: any) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/usuarios/${user.id}`,
      {
        nombre: user.nombre,
        contacto: user.contacto,
        rol_id: user.rol === "admin" ? "R1" : "R2",
      }
    );

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? res.data : u))
    );

  } catch (error) {
    console.error("Error actualizando:", error);
  }
};

  const removeUser = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return {
    users,
    loading,
    addUser,
    editUser,
    removeUser,
  };
};