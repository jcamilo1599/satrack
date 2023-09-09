import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskModel} from "../models/task";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private tasksUrl = "https://us-central1-satrack-2485a.cloudfunctions.net/api/tasks/";

  constructor(private http: HttpClient) {
  }

  getTasks(userId: string): Observable<TaskModel[]> {
    const url = `${this.tasksUrl}${userId}`
    return this.http.get<TaskModel[]>(url);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(this.tasksUrl, taskData);
  }

  updateTask(taskId: any, taskData: any): Observable<any> {
    const url = `${this.tasksUrl}${taskId}`
    return this.http.put(url, taskData);
  }

  deleteTask(taskId: any, userId: any): Observable<any> {
    const url = `${this.tasksUrl}${taskId}`
    const params = new HttpParams().set("userId", userId);

    return this.http.delete(url, {params});
  }
}
