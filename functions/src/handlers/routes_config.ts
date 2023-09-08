import {Router} from "express";
import {TasksAddUseCase} from "../use_cases/tasks/add";
import container from "../container";
import {TasksDeleteUseCase} from "../use_cases/tasks/delete";
import {TasksGetUseCase} from "../use_cases/tasks/get";
import {TasksUpdateUseCase} from "../use_cases/tasks/update";

const router: Router = Router();

export class RoutesConfig {
  public static tasks(): Router {
    const tasksAddUseCase: TasksAddUseCase = container.resolve(TasksAddUseCase);
    const tasksGetUseCase: TasksGetUseCase = container.resolve(TasksGetUseCase);
    const tasksUpdateUseCase: TasksUpdateUseCase = container.resolve(TasksUpdateUseCase);
    const tasksDeleteUseCase: TasksDeleteUseCase = container.resolve(TasksDeleteUseCase);

    router.post("/", tasksAddUseCase.instance.bind(tasksAddUseCase));
    router.get("/:userId", tasksGetUseCase.instance.bind(tasksGetUseCase));
    router.put("/:taskId", tasksUpdateUseCase.instance.bind(tasksUpdateUseCase));
    router.delete("/:taskId", tasksDeleteUseCase.instance.bind(tasksDeleteUseCase));

    return router;
  }
}
