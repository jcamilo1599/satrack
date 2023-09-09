import {Component, ViewChild} from "@angular/core";
import {TaskModel} from "../../models/task";
import {TasksService} from "../../services/tasks";
import {MatDialog} from "@angular/material/dialog";
import {TasksFormComponent} from "../tasks-form/tasks-form.component";
import {TasksDeleteComponent} from "../tasks-delete/tasks-delete.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TasksCompleteComponent} from "../tasks-complete/tasks-complete.component";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"]
})
export class StartComponent {
  dataSource: MatTableDataSource<TaskModel>;
  displayedColumns: string[] = ["title", "description", "category", "deadline", "completed", "actions"];
  userId?: string

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    const baseDataSource: TaskModel[] = [];
    this.dataSource = new MatTableDataSource(baseDataSource);
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId") ?? "";
    this.getTasks();
  }

  private getTasks() {
    this.tasksService.getTasks(this.userId ?? "").subscribe((tasks) => {
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator!;
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
        this.tasksService.deleteTask(taskId, this.userId ?? "").subscribe(() => {
          this.getTasks();
          this.openSnackBar("Tarea eliminada", "CERRAR");
        });
      }
    });
  }

  completeTask(taskId: string) {
    const dialogRef = this.dialog.open(TasksCompleteComponent, {
      width: "400px",
      data: this.getTaskById(taskId),
    });

    dialogRef.beforeClosed().subscribe((action: boolean): void => {
      if (action) {
        this.tasksService.ccompleteTask(taskId, this.userId ?? "").subscribe(() => {
          this.getTasks();
          this.openSnackBar("Tarea completada", "CERRAR");
        });
      }
    });
  }

  private getTaskById(taskId: string): TaskModel | undefined {
    return this.dataSource.data.find((task) => task.id === taskId);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
