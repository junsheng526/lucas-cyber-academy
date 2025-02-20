import { useState, useEffect } from "react";

// Dummy grayscale settings (replace with API call in future)
const dummyGrayscaleConfig = {
  dashboard: true,
  manageCourses: false,
  manageLecturers: true,
  manageEnrollments: true,
  manageSchedule: false,
  editProfile: true,
};

export const useGrayscale = () => {
  const [grayscaleConfig, setGrayscaleConfig] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Simulating a fetch call
    setTimeout(() => {
      setGrayscaleConfig(dummyGrayscaleConfig);
    }, 500);
  }, []);

  return grayscaleConfig;
};
