import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const getUsers = async () => {
  const res = await API.get("/usuarios");
  return res.data;
};

export const createUser = async (user: {
  nombre: string;
  contacto: string;
  rol_id: string;
}) => {
  const res = await API.post("/usuarios", user);
  return res.data;
};

export const updateUser = async (
  id: string,
  user: {
    nombre: string;
    contacto: string;
    rol_id: string;
  },
) => {
  const res = await API.put(`/usuarios/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: string) => {
  await API.delete(`/usuarios/${id}`);
};
export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};
