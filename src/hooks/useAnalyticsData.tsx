import { useEffect, useState } from "react";
import { firestoreService, Docs } from "../services/firestoreService";

interface AnalysisData {
  emailCount: number;
  targetCount: number;
}

const EMAIL_DOC_ID = "email_count";

export const useAnalyticsData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emailCount, setEmailCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData>();

  /**
   * Fetch the email count from Firestore.
   * If the document does not exist, create it with an initial count of 0.
   */
  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      const data = await firestoreService.fetchDocById(
        Docs.ANALYSIS_DATA,
        EMAIL_DOC_ID
      );

      if (data) {
        setAnalysisData(data);
        setEmailCount(data.emailCount || 0);
        setTargetCount(data.targetCount || 0);
      } else {
        // Document does not exist, create it with an initial count of 0
        await firestoreService.setDoc(Docs.ANALYSIS_DATA, EMAIL_DOC_ID, {
          emailCount: 0,
        });
        setEmailCount(0);
      }
    } catch (err) {
      setError("Failed to fetch email count.");
      console.error("Error fetching email analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Increments the email count in Firestore.
   * If the document does not exist, it will be created first.
   */
  const incrementEmailCount = async () => {
    try {
      setLoading(true);

      // Ensure document exists before updating
      const existingDoc = await firestoreService.fetchDocById(
        Docs.ANALYSIS_DATA,
        EMAIL_DOC_ID
      );
      if (!existingDoc) {
        await firestoreService.setDoc(Docs.ANALYSIS_DATA, EMAIL_DOC_ID, {
          emailCount: 1,
        });
        setEmailCount(1);
      } else {
        await firestoreService.updateDoc(Docs.ANALYSIS_DATA, EMAIL_DOC_ID, {
          emailCount: existingDoc.emailCount + 1,
        });
        setEmailCount((prev) => prev + 1);
      }

      console.log("✅ Email count updated successfully.");
    } catch (err) {
      setError("Failed to update email count.");
      console.error("Error updating email analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisData(); // Load email count on mount
  }, []);

  return {
    analysisData,
    emailCount,
    targetCount,
    loading,
    error,
    incrementEmailCount,
    fetchAnalysisData,
  };
};
