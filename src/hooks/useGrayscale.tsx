import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";

export const useGrayscale = () => {
  const [grayscaleConfig, setGrayscaleConfig] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchGrayscaleConfig();
  }, []);

  const fetchGrayscaleConfig = async () => {
    try {
      const config = await firestoreService.fetchDocs(Docs.GRAYSCALE);
      if (config.length > 0) {
        setGrayscaleConfig(config[0].settings || {});
      }
    } catch (error) {
      console.error("Error fetching grayscale settings:", error);
    }
  };

  const updateGrayscaleConfig = async (newConfig: {
    [key: string]: boolean;
  }) => {
    try {
      await firestoreService.updateDoc(Docs.GRAYSCALE, "6WnrX6rUuwUzOBkwLX1J", {
        settings: newConfig,
      });
      setGrayscaleConfig(newConfig);
    } catch (error) {
      console.error("Error updating grayscale settings:", error);
    }
  };

  return { grayscaleConfig, updateGrayscaleConfig };
};
