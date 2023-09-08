import {Request, Response} from "express";
import db from "../../adapters/firestore";

export async function tasksAddUseCase(req: Request, res: Response): Promise<Response> {
  try {
    // Datos de la nueva tarea
    const {title, description, userId} = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({message: "No se proporcionó la información para crear la tarea."});
    }

    // Crea un nuevo documento con la tarea
    const taskRef = await db.collection("tasks").add({
      title,
      description,
      userId,
      createdAt: Date.now(),
    });

    // Responde con el id de la tarea
    return res.status(201).json({id: taskRef.id});
  } catch (error) {
    console.error("Error al crear la tarea: ", error);
    return res.status(500).json({message: "Se produjo un error al crear la tarea."});
  }
}