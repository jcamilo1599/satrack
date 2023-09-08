import {onRequest} from "firebase-functions/v2/https";
import {ExpressAdapter} from "./adapters/express";

const express: ExpressAdapter = new ExpressAdapter();

export const api = onRequest(express.instance());
