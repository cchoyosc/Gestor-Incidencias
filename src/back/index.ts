import express from "express";
import cors from "cors";
import { pool } from "./db";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const rolMap: Record<string, string> = {
  Admin: "R1",
  Mantenimiento: "R4",
};

// GET todos
app.get("/usuarios", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// GET por ID
app.get("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// POST crear
app.post("/usuarios", async (req: Request, res: Response) => {
  try {
    const { nombre, contacto, email, rol, password } = req.body;
    const rol_id = rolMap[rol];

    if (!rol_id) {
      res.status(400).json({ message: "Rol inválido" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 👈

    const result = await pool.query(
      `INSERT INTO users (nombre, contacto, email, rol_id, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, contacto, email, rol_id, hashedPassword], // 👈
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error POST:", error);
    res
      .status(500)
      .json({ message: "Error al crear usuario", detail: String(error) });
  }
});

// PUT actualizar
app.put("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, contacto, email, rol } = req.body;
    console.log("📦 Body recibido:", req.body);
    const rol_id = rolMap[rol];

    if (!rol_id) {
      res.status(400).json({ message: "Rol inválido" });
      return;
    }

    const result = await pool.query(
      `UPDATE users SET nombre=$1, contacto=$2, email=$3, rol_id=$4 WHERE id=$5 RETURNING *`,
      [nombre, contacto, email, rol_id, id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
  console.log("📦 Body PUT recibido:", req.body);
});

// DELETE eliminar
app.put("/usuarios/:id/desactivar", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE users SET activo=false WHERE id=$1 RETURNING *`,
      [id],
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al desactivar usuario" });
  }
});

(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Base de datos conectada");
    app.listen(3000, () => {
      console.log("🚀 API en http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Error conectando a la base de datos", error);
  }
})();
// POST login
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1 AND activo=true`,
      [email],
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: "Credenciales incorrectas" });
      return;
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password); // 👈

    if (!match) {
      res.status(401).json({ message: "Credenciales incorrectas" });
      return;
    }

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});
