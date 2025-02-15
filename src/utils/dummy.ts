import { dummyLecturers } from "../data/lecturer";
import { Docs, firestoreService } from "../services/firestoreService";

export const uploadLecturersToFirestore = async () => {
  try {
    for (const lecturer of dummyLecturers) {
      const docRef = await firestoreService.insertDoc(Docs.LECTURERS, lecturer);
    }
    console.log("✅ All lecturers uploaded successfully!");
  } catch (error) {
    console.error("❌ Error uploading lecturers:", error);
  }
};
