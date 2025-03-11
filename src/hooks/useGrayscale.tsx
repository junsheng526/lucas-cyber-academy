import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";

export const useGrayscale = () => {
  const [grayscaleConfig, setGrayscaleConfig] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const unsubscribe = firestoreService.listenToDoc(
      Docs.GRAYSCALE,
      "6WnrX6rUuwUzOBkwLX1J",
      (doc) => {
        if (doc && doc.settings) {
          setGrayscaleConfig(doc.settings);
        }
        console.log("Updated grayscaleConfig -> ", doc.settings);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const updateGrayscaleConfig = async (newConfig: {
    [key: string]: boolean;
  }) => {
    try {
      await firestoreService.updateDoc(Docs.GRAYSCALE, "6WnrX6rUuwUzOBkwLX1J", {
        settings: newConfig,
      });
    } catch (error) {
      console.error("Error updating grayscale settings:", error);
    }
  };

  return { grayscaleConfig, updateGrayscaleConfig };
};
