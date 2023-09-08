import {container} from "tsyringe";
import {FirebaseTasksRepository} from "./repositories/firebase.tasks";
import {ITasksRepository} from "./interfaces/tasks.reposity.interface";

container.register<ITasksRepository>("FirebaseTasksRepository", {
  useClass: FirebaseTasksRepository,
});

export default container;
