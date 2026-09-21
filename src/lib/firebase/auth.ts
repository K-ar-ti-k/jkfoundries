import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./config";

export const login = async (email: string, password: string) => {
  if (!isFirebaseConfigured) {
    return { user: null, error: "Firebase is not configured. Check your .env.local file." };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { user: null, error: message };
  }
};

export const logout = async () => {
  if (!isFirebaseConfigured) {
    return { error: "Firebase is not configured. Check your .env.local file." };
  }

  try {
    await signOut(auth);
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { error: message };
  }
};

export const createAdminUser = async (email: string, password: string, displayName: string) => {
  if (!isFirebaseConfigured) {
    return { user: null, error: "Firebase is not configured. Check your .env.local file." };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return { user: userCredential.user, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { user: null, error: message };
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  if (!isFirebaseConfigured) return Promise.resolve(null);

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

