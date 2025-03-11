import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Firestore Node References
export type NodeRef =
  | "users"
  | "students"
  | "courses"
  | "enrollments"
  | "schedules"
  | "attendance"
  | "payments"
  | "sessions"
  | "user_profile"
  | "lecturer"
  | "course_schedules"
  | "grayscale"
  | "course_ratings"
  | "home_content";

export enum Docs {
  USERS = "users",
  STUDENTS = "students",
  COURSES = "courses",
  ENROLLMENTS = "enrollments",
  SCHEDULES = "schedules",
  ATTENDANCE = "attendance",
  PAYMENTS = "payments",
  SESSION = "sessions",
  USER_PROFILE = "user_profile",
  LECTURERS = "lecturer",
  COURSE_SCHEDULES = "course_schedules",
  GRAYSCALE = "grayscale",
  COURSE_RATINGS = "course_ratings",
  HOME_CONTENT = "home_content",
}

// Firestore Utilities
export const firestoreService = {
  /**
   * Add a new document to a Firestore collection
   * @param nodeRef - Collection name
   * @param params - Data to insert
   * @returns The generated document ID
   */
  insertDoc: async (nodeRef: NodeRef, params: any): Promise<string> => {
    try {
      const ref = collection(db, nodeRef);
      const docRef = await addDoc(ref, params);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${nodeRef}:`, error);
      throw error;
    }
  },

  /**
   * Fetch all documents from a Firestore collection
   * @param nodeRef - Collection name
   * @returns The fetched documents
   */
  fetchDocs: async (nodeRef: NodeRef): Promise<any[]> => {
    try {
      const ref = collection(db, nodeRef);
      const snapshot = await getDocs(ref);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error fetching documents from ${nodeRef}:`, error);
      throw error;
    }
  },

  /**
   * Fetch a single document by ID from a Firestore collection
   * @param nodeRef - Collection name
   * @param docId - Document ID
   * @returns The fetched document data
   */
  fetchDocById: async (
    nodeRef: NodeRef,
    docId: string
  ): Promise<any | null> => {
    try {
      const docRef = doc(db, nodeRef, docId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      } else {
        return null; // Return null if the document does not exist
      }
    } catch (error) {
      console.error(`Error fetching document ${docId} from ${nodeRef}:`, error);
      throw error;
    }
  },

  /**
   * Update a Firestore document
   * @param nodeRef - Collection name
   * @param docId - Document ID
   * @param params - Data to update
   */
  updateDoc: async (
    nodeRef: NodeRef,
    docId: string,
    params: any
  ): Promise<void> => {
    try {
      const docRef = doc(db, nodeRef, docId);
      await updateDoc(docRef, params);
    } catch (error) {
      console.error(`Error updating document ${docId} in ${nodeRef}:`, error);
      throw error;
    }
  },

  /**
   * Delete a Firestore document
   * @param nodeRef - Collection name
   * @param docId - Document ID
   */
  deleteDoc: async (nodeRef: NodeRef, docId: string): Promise<void> => {
    try {
      const docRef = doc(db, nodeRef, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${docId} from ${nodeRef}:`, error);
      throw error;
    }
  },
  /**
   * Create or overwrite a Firestore document
   * @param nodeRef - Collection name
   * @param docId - Document ID
   * @param params - Data to set
   * @param merge - Whether to merge with existing data (default: false)
   */
  setDoc: async (
    nodeRef: NodeRef,
    docId: string,
    params: any,
    merge: boolean = false
  ): Promise<void> => {
    try {
      const docRef = doc(db, nodeRef, docId);
      await setDoc(docRef, params, { merge });
    } catch (error) {
      console.error(`Error setting document ${docId} in ${nodeRef}:`, error);
      throw error;
    }
  },
  listenToDoc: (
    nodeRef: NodeRef,
    docId: string,
    onUpdate: (data: any) => void
  ): (() => void) => {
    try {
      const docRef = doc(db, nodeRef, docId);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          onUpdate({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.log(`Document ${docId} in ${nodeRef} does not exist.`);
          onUpdate(null); // Return null if the document doesn't exist
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error(
        `Error listening to document ${docId} in ${nodeRef}:`,
        error
      );
      throw error;
    }
  },
};
