import {Component} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  async login() {
    const {email, password} = this.loginForm.value;

    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        const idToken = await user.getIdToken();

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", idToken);

        await this.router.navigate(["/"]);
      } else {
        this.openSnackBar("No se pudo obtener el token de autenticación.", "CERRAR");
      }
    } catch (error: any) {
      if (error.code === "auth/user-disabled") {
        this.openSnackBar("El usuario ha sido deshabilitado.", "CERRAR");
      } else {
        this.openSnackBar("El correo electrónico y la contraseña no coinciden.", "CERRAR");
      }
    }
  }

  openRegister() {
    let dialogRef = this.dialog.open(RegisterComponent, {
      width: "400px",
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
