import admin from "firebase-admin";
import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

export const db = admin.firestore();
export const serverTimeStamp = admin.firestore.FieldValue.serverTimestamp();
