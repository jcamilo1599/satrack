import {Component, Inject, Optional} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskModel} from "../../models/task";

@Component({
  selector: "app-tasks-delete",
  templateUrl: "./tasks-delete.component.html",
  styleUrls: ["./tasks-delete.component.scss"]
})
export class TasksDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<TasksDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public taskData?: TaskModel,
  ) {
  }

  deleteTask() {
    this.dialogRef.close(true);
  }
}
