import { useEffect, useState } from "react";
import { firestoreService, Docs } from "../services/firestoreService";
import { AuthorType } from "../types/types";

export interface Lecturer {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const useAboutLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      setLoading(true);
      setError(null);
      try {
        const lecturersSnapshot = await firestoreService.fetchDocs(
          Docs.LECTURERS
        );
        const lecturersData = lecturersSnapshot.map((doc) => ({
          id: doc.id,
          ...doc,
        }));
        setLecturers(lecturersData);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
        setError("Failed to load lecturers.");
      }
      setLoading(false);
    };

    fetchLecturers();
  }, []);

  // Admin functions
  const addLecturer = async (lecturerData: Omit<Lecturer, "id">) => {
    try {
      const newDoc = await firestoreService.insertDoc(
        Docs.LECTURERS,
        lecturerData
      );
      setLecturers([...lecturers, { id: newDoc, ...lecturerData }]);
    } catch (error) {
      console.error("Error adding lecturer:", error);
    }
  };

  const updateLecturer = async (
    id: string,
    updatedData: Partial<AuthorType>
  ) => {
    try {
      await firestoreService.updateDoc(Docs.LECTURERS, id, updatedData);
      setLecturers(
        lecturers.map((lecturer) =>
          lecturer.id === id ? { ...lecturer, ...updatedData } : lecturer
        )
      );
    } catch (error) {
      console.error("Error updating lecturer:", error);
    }
  };

  const deleteLecturer = async (id: string) => {
    try {
      await firestoreService.deleteDoc(Docs.LECTURERS, id);
      setLecturers(lecturers.filter((lecturer) => lecturer.id !== id));
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    }
  };

  return {
    lecturers,
    loading,
    error,
    addLecturer,
    updateLecturer,
    deleteLecturer,
  };
};

export default useAboutLecturers;
