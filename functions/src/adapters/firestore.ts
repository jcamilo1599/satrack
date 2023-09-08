import * as admin from "firebase-admin";
import {Firestore} from "@google-cloud/firestore";
import * as path from "path";

const filePath: string = path.join(__dirname, "/keys/satrack-firebase.json");
const serviceAccount: Record<string, unknown> = require(filePath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://satrack-67716-default-rtdb.firebaseio.com",
});

const db: admin.firestore.Firestore = admin.firestore() as Firestore;

export default db;