import {firestore} from "firebase-admin";
import WriteResult = firestore.WriteResult;

export interface ITasksRepository {
  add(
    title: string,
    description: string,
    category: number,
    deadline: number,
    userId: string,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;

  getTask(taskId: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>;

  delete(taskId: string): Promise<WriteResult>;

  getTasks(userId: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>;

  update(
    taskId: string,
    title: string,
    description: string,
    category: number,
    deadline: number,
  ): Promise<WriteResult>;
}
