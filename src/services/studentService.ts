import {firestoreService as db, Docs} from "./firestoreService";

export const registerStudent = async (params: any) => {
  try {
    const studentDoc = {
      ...params,
      createdAt: new Date(),
    };

    const docId = await db.insertDoc(Docs.STUDENTS, studentDoc);

    return { docId };
  } catch (error) {
    console.error("Error registering student: ", error);
    throw error;
  }
};

export const getAllStudents = async () => {
  try {
    const students = await db.fetchDocs(Docs.STUDENTS);
    return students;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};