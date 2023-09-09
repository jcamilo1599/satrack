import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {environment} from "../environments/environment";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./components/app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StartComponent} from "./components/start/start.component";
import {LoginComponent} from "./components/login/login.component";
import {TasksFormComponent} from "./components/tasks-form/tasks-form.component";
import {TasksDeleteComponent} from "./components/tasks-delete/tasks-delete.component";
import {RegisterComponent} from "./components/register/register.component";
import {TasksCompleteComponent} from "./components/tasks-complete/tasks-complete.component";
import {LoadingApiInterceptor} from "./interceptors/loading-api.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoginComponent,
    TasksFormComponent,
    TasksDeleteComponent,
    RegisterComponent,
    TasksCompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
