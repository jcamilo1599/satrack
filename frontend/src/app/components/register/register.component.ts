import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    registerEmail: ["", [Validators.required, Validators.email]],
    registerPassword: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  async register() {
    const {registerEmail, registerPassword} = this.registerForm.value;

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(registerEmail, registerPassword);
      const user = userCredential.user;

      this.dialogRef.close();

      if (user) {
        const idToken = await user.getIdToken();

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", idToken);

        await this.router.navigate(["/"]);
      } else {
        this.openSnackBar("La cuenta se registro pero no se pudo obtener el token de autenticación; inicia sesión manualmente.", "CERRAR");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        this.openSnackBar("El correo electrónico ya esta registrado.", "CERRAR");
      } else {
        this.openSnackBar("Se produjo un error, intentalo nuevamente.", "CERRAR");
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
