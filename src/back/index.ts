import express from "express";
import cors from "cors";
import { pool } from "./db";
import type { Request, Response } from "express";


const app = express();


app.use(cors());
app.use(express.json());

app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, contacto, rol_id } = req.body;

    const result = await pool.query(
      `INSERT INTO users (nombre, contacto, rol_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, contacto, rol_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario" });
  }
});

// Obtener todos los usuarios
app.get("/usuarios", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id"); 
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Obtener usuario por ID
app.get("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" }); // sin return
      return;
    }

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// Crear usuario
app.post("/usuarios", async (req: Request, res: Response) => {
  try {
    const { nombre, identificacion, rol } = req.body;
    const result = await pool.query(
      "INSERT INTO users (nombre, identificacion, rol_ID) VALUES ($1, $2, $3) RETURNING *",
      [nombre, identificacion, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

// Actualizar usuario
app.put("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, contacto, rol_id} = req.body;
    const result = await pool.query(
      `UPDATE users SET nombre=$1, contacton=$2, rol_id=$3 WHERE id=$4 RETURNING *`,
      [nombre, contacto, rol_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});

// Eliminar usuario
app.delete("/usuarios/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: "Error al eliminar usuario" });
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