import {Component, Inject, Optional} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskModel} from "../../models/task";

@Component({
  selector: "app-tasks-complete",
  templateUrl: "./tasks-complete.component.html",
  styleUrls: ["./tasks-complete.component.scss"]
})
export class TasksCompleteComponent {
  constructor(
    private dialogRef: MatDialogRef<TasksCompleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public taskData?: TaskModel,
  ) {
  }

  completeTask() {
    this.dialogRef.close(true);
  }
}
