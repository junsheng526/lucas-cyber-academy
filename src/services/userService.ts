import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { firestoreService as db, Docs } from "./firestoreService";

export const registerUser = async (params: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password
    );

    await updateProfile(userCredential.user, {
      displayName: params.name,
    });

    const userDoc = {
      ...params,
      createdAt: new Date(),
    };

    const userId = userCredential.user.uid;

    const docId = await db.setDoc(Docs.USERS, userId, userDoc);

    return { uid: userCredential.user.uid, docId };
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.fetchDocs(Docs.USERS);
    return users;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};
