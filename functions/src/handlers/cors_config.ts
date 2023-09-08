import {Handler} from "express";
import * as cors from "cors";

const allowedOrigins: Array<string | undefined> = [
  undefined,
  "http://localhost:4200",
  "https://satrack-67716.web.app",
  "https://satrack-67716.firebaseapp.com",
];

export function corsConfig(): Handler {
  return cors({
    origin: (origin: string | undefined, callback): void => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`El acceso desde "${origin}" no esta permitido`));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
}
