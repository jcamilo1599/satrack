import {Router} from "express";
import {tasksAddUseCase} from "../use_cases/tasks/add";
import {tasksGetUseCase} from "../use_cases/tasks/get";
import {tasksUpdateUseCase} from "../use_cases/tasks/update";
import {tasksDeleteUseCase} from "../use_cases/tasks/delete";

const router: Router = Router();

export class RoutesConfig {
  public static tasks(): Router {
    router.post("/", tasksAddUseCase);
    router.get("/:userId", tasksGetUseCase);
    router.put("/:taskId", tasksUpdateUseCase);
    router.delete("/:taskId", tasksDeleteUseCase);

    return router;
  }
}