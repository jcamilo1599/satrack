import {ITasksRepository} from "../interfaces/tasks.reposity.interface";
import db from "../adapters/firestore";
import {firestore} from "firebase-admin";
import WriteResult = firestore.WriteResult;

export class FirebaseTasksRepository implements ITasksRepository {
  add(
    title: string,
    description: string,
    category: number,
    deadline: number,
    userId: string,
  ): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> {
    return db.collection("tasks").add({
      title,
      description,
      category,
      deadline,
      userId,
      completed: false,
      createdAt: Date.now(),
    });
  }

  delete(taskId: string): Promise<WriteResult> {
    return db.collection("tasks").doc(taskId).delete();
  }

  getTask(taskId: string): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>> {
    return db.collection("tasks").doc(taskId).get();
  }

  getTasks(userId: string): Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>> {
    return db.collection("tasks").where("userId", "==", userId).orderBy("createdAt", "desc").get();
  }

  update(
    taskId: string,
    title: string,
    description: string,
    category: number,
    deadline: number,
  ): Promise<WriteResult> {
    return db.collection("tasks").doc(taskId).update({
      title,
      description,
      category,
      deadline,
    });
  }

  completeTask(taskId: string): Promise<FirebaseFirestore.WriteResult> {
    return db.collection("tasks").doc(taskId).update({
      completed: true,
    });
  }
}
