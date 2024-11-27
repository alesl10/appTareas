import express from "express";
import { conexion } from "./db.js";
import cors from "cors";
import authRouter from './routes/auth.routes.js'
import taskRouter from './routes/task.routes.js'

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser)
app.use(authRouter)
app.use(taskRouter)

conexion.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Conectado a la base de datos");
  }
});

app.listen(8080, () => {
  console.log("Servidor arriba");
});
