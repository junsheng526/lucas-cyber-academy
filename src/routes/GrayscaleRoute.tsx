import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGrayscale } from "../hooks/useGrayscale";

interface GrayscaleRouteProps {
  element: JSX.Element;
}

export const GrayscaleRoute = ({ element }: GrayscaleRouteProps) => {
  const location = useLocation();
  const { grayscaleConfig } = useGrayscale();

  const currentPath = location.pathname.replace(/^\//, "");
  const isGrayscaleEnabled = grayscaleConfig[currentPath] || false;

  useEffect(() => {
    console.log("GrayscaleRoute Grayscale -> ", grayscaleConfig);
  }, [grayscaleConfig]);

  if (isGrayscaleEnabled) {
    return <Navigate to="/access-denied" replace />;
  }

  return element;
};
