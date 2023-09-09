import {Component} from "@angular/core";
import {LoadingApiService} from "../services/loading-api";
import {Router} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(
    private router: Router,
    public loadingApiService: LoadingApiService,
  ) {
  }

  async closeSession() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    await this.router.navigate(["/login"]);
  }
}
