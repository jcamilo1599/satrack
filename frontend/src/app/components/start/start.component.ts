import {Component} from "@angular/core";
import {TaskModel} from "../../models/task";
import {TasksService} from "../../services/tasks";
import {MatDialog} from "@angular/material/dialog";
import {TasksFormComponent} from "../tasks-form/tasks-form.component";
import {TasksDeleteComponent} from "../tasks-delete/tasks-delete.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"]
})
export class StartComponent {
  dataSource: TaskModel[] = [];
  displayedColumns: string[] = ["title", "description", "category", "deadline", "actions"];
  userId?: string

  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId") ?? "";
    this.getTasks();
  }

  private getTasks() {
    this.tasksService.getTasks(this.userId ?? "").subscribe((tasks) => {
      this.dataSource = tasks;
    });
  }

  editTask(taskId: string) {
    this.openDialogTask(this.getTaskById(taskId));
  }

  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(TasksDeleteComponent, {
      width: "400px",
      data: this.getTaskById(taskId),
    });

    dialogRef.beforeClosed().subscribe((action: boolean): void => {
      if (action) {
        this.tasksService.deleteTask(taskId, this.userId ?? "").subscribe((tasks) => {
          this.getTasks();
          this.openSnackBar("Tarea eliminada", "CERRAR");
        });
      }
    });
  }

  private getTaskById(taskId: string): TaskModel | undefined {
    return this.dataSource.find((task) => task.id === taskId);
  }

  openDialogTask(task?: TaskModel) {
    const dialogRef = this.dialog.open(TasksFormComponent, {
      width: "400px",
      data: task,
    });

    dialogRef.beforeClosed().subscribe((action: boolean): void => {
      if (action) {
        this.getTasks();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
