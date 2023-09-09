import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-tasks-delete",
  templateUrl: "./tasks-delete.component.html",
  styleUrls: ["./tasks-delete.component.scss"]
})
export class TasksDeleteComponent {
  constructor(private dialogRef: MatDialogRef<TasksDeleteComponent>) {
  }

  deleteTask() {
    this.dialogRef.close(true);
  }
}
