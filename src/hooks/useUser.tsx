import { useState, useEffect } from "react";
import { Docs, firestoreService } from "../services/firestoreService";
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
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userData = await firestoreService.fetchDocById(
            Docs.USERS,
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

    const fetchUserCount = async () => {
      try {
        const users = await firestoreService.fetchDocs(Docs.USERS);
        const filteredUsers = users.filter(
          (user: User) =>
            user.role.toLowerCase() === "lecturer" ||
            user.role.toLowerCase() === "student"
        );
        setUserCount(filteredUsers.length); // 🔥 Set the count of lecturers and students
      } catch (err) {
        console.error("Error fetching user count:", err);
        setError("Error fetching user count");
      }
    };

    if (user?.uid) {
      fetchUserData();
    } else {
      setLoading(false);
    }

    fetchUserCount();

    return () => {
      setUserData(null);
      setError(null);
      setLoading(true);
    };
  }, [user]);

  return { userData, loading, error, userCount };
};
