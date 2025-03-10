import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Docs, firestoreService } from "../services/firestoreService";
import { useUser } from "../hooks/useUser";
import { useGrayscale } from "../hooks/useGrayscale";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

export const ProtectedRoute = ({
  element,
  allowedRoles,
}: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, loading } = useUser();
  const { grayscaleConfig } = useGrayscale();

  // Check if grayscale mode is enabled for the current route
  const currentPath = location.pathname.replace(/^\//, ""); // Remove leading slash
  const isGrayscaleEnabled = grayscaleConfig[currentPath] || false;

  console.log(
    "Check grayscaleConfig in route -> " + JSON.stringify(grayscaleConfig)
  );

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userData || !isAuthenticated) return;

    if (!allowedRoles.includes(userData.role)) {
      navigate("/not-found", { replace: true });
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const localSessionId = localStorage.getItem("sessionId");

      const unsubscribeSession = firestoreService.listenToDoc(
        Docs.SESSION,
        user.uid,
        (sessionData) => {
          if (sessionData && sessionData.sessionId !== localSessionId) {
            handleForceLogout();
          }
        }
      );

      return () => unsubscribeSession();
    }
  }, [userData, isAuthenticated, allowedRoles, navigate]);

  const handleForceLogout = async () => {
    console.warn("Session mismatch detected. Logging out...");
    localStorage.removeItem("sessionId");
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  // if (loading || isAuthenticated === null) {
  //   return <div>Loading...</div>;
  // }

  if (
    loading ||
    isAuthenticated === null ||
    Object.keys(grayscaleConfig).length === 0
  ) {
    console.log("Waiting for user auth or grayscale settings...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚨 Cut off access if grayscale is OFF
  console.log("Check isGrayscaleEnabled -> " + isGrayscaleEnabled);
  if (isGrayscaleEnabled) {
    return <Navigate to="/not-found" replace />;
  }

  return element;
};
