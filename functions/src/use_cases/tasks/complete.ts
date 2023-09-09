import "reflect-metadata";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {ITasksRepository} from "../../interfaces/tasks.reposity.interface";

@injectable()
export class TasksCompleteUseCase {
  constructor(@inject("FirebaseTasksRepository") private tasksRepository: ITasksRepository) {
  }

  public async instance(req: Request, res: Response): Promise<Response> {
    try {
      // ID de la tarea que se completara
      const taskId: string = req.params.taskId;

      // ID del usuario que completara la tarea
      const userId = req.query.userId?.toString() ?? "";

      if (!taskId || !userId) {
        return res.status(400).json({message: "No se proporcionó la información para completar la tarea."});
      }

      // Consulta la tarea por su ID
      const taskSnapshot = await this.tasksRepository.getTask(taskId);

      if (!taskSnapshot.exists) {
        return res.status(404).json({message: "La tarea no existe."});
      }

      // Obtiene los datos de la tarea
      const taskData = taskSnapshot.data();

      // Verifica que el usuario que completa la tarea sea el mismo que la creó
      if (taskData == undefined || taskData.userId !== userId) {
        return res.status(403).json({message: "No tienes permiso para completar esta tarea."});
      }

      // Modifica los datos de la tarea
      await this.tasksRepository.completeTask(taskId);

      return res.status(200).json({message: "La tarea se completo con éxito."});
    } catch (error) {
      console.error("Error al editar la tarea: ", error);
      return res.status(500).json({message: "Se produjo un error completando la tarea."});
    }
  }
}
