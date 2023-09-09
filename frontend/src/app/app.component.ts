import {Component} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isLoggin(): boolean {
    const token: string | null = sessionStorage.getItem("token");
    return !!token;
  }
}
