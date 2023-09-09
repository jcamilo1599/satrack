import {Component} from "@angular/core";
import {TaskModel} from "../../models/task";
import {TasksService} from "../../services/tasks";
import {MatDialog} from "@angular/material/dialog";
import {TasksFormComponent} from "../tasks-form/tasks-form.component";

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
    this.openDialogTask(
      this.dataSource.find((task) => task.id === taskId),
      true,
    );
  }

  deleteTask(taskId: string) {
  }

  openDialogTask(task?: TaskModel, edit: boolean = false) {
    const dialogRef = this.dialog.open(TasksFormComponent, {
      width: "400px",
      data: task,
    });

    dialogRef.beforeClosed().subscribe((): void => {
      this.getTasks();
    });
  }
}
