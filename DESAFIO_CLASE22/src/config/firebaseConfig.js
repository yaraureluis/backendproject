import admin from "firebase-admin";
const firebaseConfig = {};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore();
