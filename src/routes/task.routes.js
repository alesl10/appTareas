import { Router  } from "express";
import {getTareas, getTareaById, addTarea, deleteTareaById, deleteTareas,updateTarea} from '../controllers/task.controllers.js'

const router = Router()

router.get('/tareas',getTareas)
router.get('/tareas/:id',getTareaById)
router.post('/tareas',addTarea)
router.delete('/tareas',deleteTareas)
router.delete('/tareas/:id',deleteTareaById)
router.put('/tareas/:id',updateTarea)


export default router;