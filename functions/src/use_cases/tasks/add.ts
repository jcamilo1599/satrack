import "reflect-metadata";
import {Request, Response} from "express";
import {ITasksRepository} from "../../interfaces/tasks.reposity.interface";
import {inject, injectable} from "tsyringe";

@injectable()
export class TasksAddUseCase {
  constructor(@inject("FirebaseTasksRepository") private tasksRepository: ITasksRepository) {
  }

  public async instance(req: Request, res: Response): Promise<Response> {
    try {
      // Datos de la nueva tarea
      const {title, description, category, deadline, userId} = req.body;

      if (!title || !description || !category || !deadline || !userId) {
        return res.status(400).json({message: "No se proporcionó la información para crear la tarea."});
      }

      // Crea un nuevo documento con la tarea
      const taskRef = await this.tasksRepository?.add(
        title,
        description,
        category,
        deadline,
        userId,
      );

      // Responde con el id de la tarea
      return res.status(201).json({id: taskRef?.id});
    } catch (error) {
      console.error("Error al crear la tarea: ", error);
      return res.status(500).json({message: "Se produjo un error al crear la tarea."});
    }
  }
}
