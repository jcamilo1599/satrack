import {Component, Inject, Optional} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../services/tasks";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskModel} from "../../models/task";

@Component({
  selector: "app-tasks-add",
  templateUrl: "./tasks-form.component.html",
  styleUrls: ["./tasks-form.component.scss"]
})
export class TasksFormComponent {
  taskForm: FormGroup = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    category: ["", Validators.required],
    deadline: ["", Validators.required],
  });

  categories: string[] = [
    "Trabajo",
    "Hogar",
    "Estudio",
    "Personal",
    "Compras",
    "Salud",
    "Viajes",
    "Deportes",
    "Entretenimiento",
    "Proyectos",
    "Finanzas",
    "Social",
    "Familia",
    "Comida",
    "Tecnología",
  ];

  constructor(
    private dialogRef: MatDialogRef<TasksFormComponent>,
    private fb: FormBuilder,
    private tasksService: TasksService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public taskData?: TaskModel,
  ) {
    // Aplica solo si es edición y se reciben datos de la edición
    if (this.taskData) {
      this.taskForm.patchValue(this.taskData);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      formData["userId"] = sessionStorage.getItem("userId");

      if (this.taskData) {
        this.updateTask(formData);
      } else {
        this.createTask(formData);
      }
    }
  }

  private createTask(formData: any) {
    this.tasksService.createTask(formData).subscribe(
      () => {
        this.dialogRef.close();
        this.openSnackBar("Tarea creada correctamente", "CERRAR");
      },
      () => {
        this.openSnackBar("Error creando la tarea, intentalo nuevamente.", "CERRAR");
      }
    );
  }

  private updateTask(formData: any) {
    this.tasksService.updateTask(this.taskData?.id, formData).subscribe(
      () => {
        this.dialogRef.close();
        this.openSnackBar("Tarea actualizada correctamente", "CERRAR");
      },
      () => {
        this.openSnackBar("Error actualizando la tarea, intentalo nuevamente.", "CERRAR");
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
