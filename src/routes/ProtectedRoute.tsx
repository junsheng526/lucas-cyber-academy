import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
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

  useEffect(() => {
    console.log("ProtectedRoute Grayscale -> ", grayscaleConfig);
  }, [grayscaleConfig]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!userData || !isAuthenticated) return;

    // check is the role allow to access the route
    if (!allowedRoles.includes(userData.role.toLowerCase())) {
      navigate("/access-denied", { replace: true });
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
    localStorage.removeItem("sessionId");
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  if (
    loading ||
    isAuthenticated === null ||
    Object.keys(grayscaleConfig).length === 0
  ) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🚨 Cut off access if grayscale is OFF
  if (isGrayscaleEnabled) {
    return <Navigate to="/access-denied" replace />;
  }

  return element;
};
