import * as functions from "firebase-functions";
import {ExpressAdapter} from "./adapters/express";

const express: ExpressAdapter = new ExpressAdapter();

export const api = functions.https.onRequest(express.instance());
