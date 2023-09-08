import {Request, Response} from "express";
import db from "../../adapters/firestore";

export async function tasksUpdateUseCase(req: Request, res: Response): Promise<Response> {
  try {
    // ID de la tarea que se modificará
    const taskId: string = req.params.taskId;

    // Nuevos datos de la tarea
    const {title, description, userId} = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({message: "No se proporcionó la información para editar la tarea."});
    }

    // Consulta la tarea por su ID
    const taskSnapshot = await db.collection("tasks").doc(taskId).get();

    if (!taskSnapshot.exists) {
      return res.status(404).json({message: "La tarea no existe."});
    }

    // Obtiene los datos de la tarea
    const taskData = taskSnapshot.data();

    // Verifica que el usuario que edita la tarea sea el mismo que la creó
    if (taskData == undefined || taskData.userId !== userId) {
      return res.status(403).json({message: "No tienes permiso para editar esta tarea."});
    }

    // Modifica los datos de la tarea
    await db.collection("tasks").doc(taskId).update({
      title,
      description,
    });

    return res.status(200).json({message: "La tarea se modifico con éxito."});
  } catch (error) {
    console.error("Error al editar la tarea: ", error);
    return res.status(500).json({message: "Se produjo un error editando la tarea."});
  }
}