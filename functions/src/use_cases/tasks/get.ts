import "reflect-metadata";
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {ITasksRepository} from "../../interfaces/tasks.reposity.interface";

@injectable()
export class TasksGetUseCase {
  constructor(@inject("FirebaseTasksRepository") private tasksRepository: ITasksRepository) {
  }

  public async instance(req: Request, res: Response): Promise<Response> {
    try {
      // Id del usuario del cual se obtendrán las tareas
      const userId = req.params.userId;

      // Obtiene las tareas por el userId
      const tasksSnapshot = await this.tasksRepository.getTasks(userId);

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
}
