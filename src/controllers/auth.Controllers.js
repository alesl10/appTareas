import { generateToken, authToken } from "../libs/jwt.js";
import { conexion } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
  try {
    conexion.query("SELECT * FROM usuario", function (error, results, fields) {
      if (error) res.status(500).json({ message: error });
      res.json(results);
    });
  } catch (error) {
    res.send({ status: "error", error: "error" });
  }
};

export const addUsuario = async (req, res) => {
  const { nombre, apellido, usuario, password, email } = req.body;

  if ((!nombre, !apellido, !usuario, !password, !email))
    res.status(400).send(["Datos incompletos"]);

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      nombre,
      apellido,
      usuario,
      password: passwordHash,
      email,
    };
    const query = `INSERT INTO usuario (nombre, apellido, usuario, password, email)
VALUES (?,?,?,?,?)`;

    conexion.query(
      query,
      [nombre, apellido, usuario, passwordHash, email],
      function (error, results, fields) {
        if (error) res.status(500).json({ message: error });

        const token = generateToken(user);
        res.cookie("token", token);
        res.json({
          message: "Usuario creado",
          data: results.insertId,
          payload: token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: "error" });
  }
};


export const login = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send(["Datos incompletos"]);
  }

  try {

    const query = `SELECT * FROM usuario WHERE email = ?`;
    
    conexion.query(query, [email], async function (error, results, fields) {
      if (error) {
        return res.status(500).json({ message: "Error en la base de datos", error });
      }

      if (results.length === 0) {
        return res.status(400).json(["Email no registrado"]);
      }
      const user = results[0];

      // Comparar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta", password:password,userPass:user.password });
      }

      
      const token = await generateToken(user);
      res.cookie("token", token);
      return res
        .status(200)
        .send({ status: "success", message: "login correcto", payload: token });
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
};

export const logout = (req, res)=> {
  res.cookie('token', '',{expires:new Date(0)})
  res.status(200).send({status:'success'})
}

