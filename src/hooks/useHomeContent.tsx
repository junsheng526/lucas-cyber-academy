import { useEffect, useState } from "react";
import { firestoreService } from "../services/firestoreService";
import { Docs } from "../services/firestoreService";

interface HomeContent {
  videos?: {
    id: string;
    title: string;
    thumbnail: string;
  }[];
  banners?: string[];
  [key: string]: any; // Allow other dynamic fields
}

interface UseHomeContentHook {
  data: HomeContent | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom Hook to fetch Home Content from Firestore
 */
const useHomeContent = (docId: string): UseHomeContentHook => {
  const [data, setData] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!docId) return;

    setLoading(true);

    firestoreService
      .fetchDocById(Docs.HOME_CONTENT, docId)
      .then((docData) => {
        setData(docData || null);
      })
      .catch((err) => {
        console.error("Error fetching home content:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [docId]);

  return { data, loading, error };
};

export default useHomeContent;
