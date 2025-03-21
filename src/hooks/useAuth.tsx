import { useEffect, useState } from "react";
import { auth } from "../config/firebase"; // Firebase setup
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return user;
};
