import { useState, useEffect } from "react";
import { firestoreService } from "../services/firestoreService";
import { useAuth } from "./useAuth";

interface User {
  name: string;
  email: string;
  role: string;
  profileImage: string;
  uid: string;
}

export const useUser = () => {
  const user = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userData = await firestoreService.fetchDocById(
            "users",
            user.uid
          );
          if (userData) {
            setUserData(userData);
          } else {
            setError("User not found");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Error fetching user data");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No user is authenticated.");
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchUserData();
    } else {
      setLoading(false);
    }

    return () => {
      setUserData(null);
      setError(null);
      setLoading(true);
    };
  }, [user]);

  return { userData, loading, error };
};
