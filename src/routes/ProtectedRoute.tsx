import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Docs, firestoreService } from "../services/firestoreService";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const user = auth.currentUser;
      if (user) {
        const localSessionId = localStorage.getItem("sessionId");

        // Real-time session listener
        const unsubscribe = firestoreService.listenToDoc(
          Docs.SESSION,
          user.uid,
          (sessionData) => {
            if (sessionData && sessionData.sessionId !== localSessionId) {
              // Session mismatch detected - force logout
              handleForceLogout();
            }
          }
        );

        return () => unsubscribe(); // Cleanup listener on unmount
      }
    };

    checkSession();
  }, [navigate]);

  const handleForceLogout = async () => {
    console.warn("Session mismatch detected. Logging out...");
    localStorage.removeItem("sessionId");
    await signOut(auth);
    navigate("/login"); // Redirect to login page
  };

  // Listen to the authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // You can show a loading spinner or placeholder here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render the protected component
  return element;
};
