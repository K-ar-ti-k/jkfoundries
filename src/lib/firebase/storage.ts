import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { isFirebaseConfigured, storage } from "./config";

export const uploadImage = async (file: File, path: string): Promise<string> => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Check your .env.local file.");
  }

  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to upload image: ${message}`);
  }
};

export const deleteImage = async (path: string): Promise<void> => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Check your .env.local file.");
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete image: ${message}`);
  }
};

export const getImageUrl = async (path: string): Promise<string> => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Check your .env.local file.");
  }

  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get image URL: ${message}`);
  }
};

