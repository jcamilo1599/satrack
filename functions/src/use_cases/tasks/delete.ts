import "reflect-metadata";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {ITasksRepository} from "../../interfaces/tasks.reposity.interface";

@injectable()
export class TasksDeleteUseCase {
  constructor(@inject("FirebaseTasksRepository") private tasksRepository: ITasksRepository) {
  }

  public async instance(req: Request, res: Response): Promise<Response> {
    try {
      // ID de la tarea que se eliminará
      const taskId: string = req.params.taskId;

      // ID del usuario que eliminara la tarea
      const userId = req.query.userId?.toString() ?? "";

      // Valid que los datos sean validos antes de eliminar la tarea
      if (!taskId || !userId) {
        return res.status(400).json({message: "No se proporcionó la información para eliminar la tarea."});
      }

      // Consulta la tarea por su ID
      const taskSnapshot = await this.tasksRepository.getTask(taskId);

      if (!taskSnapshot.exists) {
        return res.status(404).json({message: "La tarea no existe."});
      }

      // Obtiene los datos de la tarea
      const taskData = taskSnapshot.data();

      // Valida que el usuario que realiza la solicitud sea el mismo que creó la tarea
      if (taskData == undefined || taskData.userId !== userId) {
        return res.status(403).json({message: "No tienes permiso para eliminar esta tarea."});
      }

      // Elimina la tarea de Firestore
      await this.tasksRepository.delete(taskId);

      return res.status(204).end();
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
      return res.status(500).json({message: "Se produjo un error al eliminar la tarea."});
    }
  }
}
