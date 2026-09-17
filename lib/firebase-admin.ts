import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function projectId() {
  return process.env.FIREBASE_PROJECT_ID ?? "";
}

export function firebaseApiKey() {
  return process.env.FIREBASE_API_KEY ?? "";
}

export function isFirebaseAdminConfigured() {
  return Boolean(
    projectId() &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

export function firebaseStorageBucket() {
  return (
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    (projectId() ? `${projectId()}.firebasestorage.app` : "")
  );
}

function getAdminApp() {
  if (!isFirebaseAdminConfigured()) return null;

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: projectId(),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      storageBucket: firebaseStorageBucket() || undefined,
    });
  }

  return getApps()[0] ?? null;
}

export function getAdminDb() {
  const app = getAdminApp();
  if (!app) return null;

  const db = getFirestore(app);
  try {
    db.settings({ ignoreUndefinedProperties: true });
  } catch {
    // settings() can only run once per app instance
  }
  return db;
}

export function getAdminAuth() {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminBucket() {
  const app = getAdminApp();
  const bucketName = firebaseStorageBucket();
  if (!app || !bucketName) return null;
  return getStorage(app).bucket(bucketName);
}
