import * as express from "express";
import {Express, Router} from "express";
import {RoutesConfig} from "../handlers/routes_config";
import {corsConfig} from "../handlers/cors_config";

export class ExpressAdapter {
  private readonly app: Express;
  private readonly router: Router;

  constructor() {
    this.app = express();

    this.router = Router();
    this.router.use("/tasks", RoutesConfig.tasks());

    this.app.use(corsConfig());
    this.app.use(this.router);
  }

  public instance = (): express.Application => this.app;
}