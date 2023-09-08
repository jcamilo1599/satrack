import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./components/start/start.component";
import {activeSessionGuard} from "./guards/activeSession.guard";
import {LoginComponent} from "./components/login/login.component";
import {inactiveSessionGuard} from "./guards/inactiveSession.guard";

const routes: Routes = [
  {
    path: "",
    component: StartComponent,
    canActivate: [activeSessionGuard("/login")],
  },

  {
    path: "login",
    component: LoginComponent,
    canActivate: [inactiveSessionGuard()],
  },

  {path: "**", pathMatch: "full", redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
