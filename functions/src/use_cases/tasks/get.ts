import {Request, Response} from "express";
import db from "../../adapters/firestore";

export async function tasksGetUseCase(req: Request, res: Response): Promise<Response> {
  try {
    // Id del usuario del cual se obtendrán las tareas
    const userId: number = Number(req.params.userId);

    // Obtiene las tareas por el userId
    const tasksSnapshot = await db.collection("tasks").where("userId", "==", userId).get();

    // Acá se mapearan todas las tareas del usuario
    const tasks: any[] = [];

    tasksSnapshot.forEach((doc): void => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas del usuario: ", error);
    return res.status(500).json({message: "Se produjo un error al obtener las tareas."});
  }
}