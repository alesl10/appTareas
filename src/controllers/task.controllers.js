import { conexion } from "../db.js";

export const getTareas = async (req, res) => {
  try {
    const query = `SELECT * FROM tarea`;

    conexion.query(query, function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json(results);
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const getTareaByUserId = async (req, res) => {
  const {userid} = req.params;
  try {
    const query = `SELECT * FROM tarea WHERE usuario_id = ?`;
    conexion.query(query, [userid], function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json(results);
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const getTareaById = async (req, res) => {
  const {userid, id} = req.params;
  try {
    const query = `SELECT * FROM tarea WHERE id = ? AND usuario_id = ?`;
    conexion.query(query, [id, userid], function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json(results);
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const addTarea = async (req, res) => {
  const { titulo, descripcion, usuario_id, estado } = req.body;

  if (!titulo || !descripcion || !usuario_id) {
    return res.status(400).send(["Datos incompletos"]);
  }

  try {
    let query = `INSERT INTO tarea (titulo, descripcion, usuario_id`;
    const values = [titulo, descripcion, usuario_id];

    if (estado !== undefined) {
      query += `, estado) VALUES (?, ?, ?, ?)`;
      values.push(estado);
    } else {
      query += `) VALUES (?, ?, ?)`;
    }

    conexion.query(query, values, function (error, results, fields) {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      res.json({ message: "Tarea creada", data: results.insertId });
    });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export const updateTarea = async (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;
  try {
    const query = `UPDATE tarea SET estado = ? WHERE id = ?`;

    conexion.query(query, [estado, id], function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json({
        message: "Tarea actualizada correctamente",
        data: results.insertId,
      });
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const deleteTareaById = async (req, res) => {
  const {id} = req.params;
  try {
    const query = `DELETE FROM tarea WHERE id = ?`;
    conexion.query(query, [id], function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json({data:results.insertId, message: "Tarea eliminada correctamente" });
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const deleteTareas = async (req, res) => {
  const { usuario_id } = req.body;
  try {
    const query = `DELETE FROM tarea where usuario_id = ?`;
    conexion.query(query, [usuario_id], function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json({ message: "Tareas eliminadas correctamente" });
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};
