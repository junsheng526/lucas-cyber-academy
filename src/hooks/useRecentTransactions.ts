import { useState, useEffect } from "react";
import { firestoreService } from "../services/firestoreService";
import { Docs } from "../services/firestoreService";
import { format } from "date-fns";

interface Transaction {
  txId: string;
  title: string;
  user: string;
  date: string;
  cost: string;
}

const useRecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Fetch enrollments, users, and courses
        const [enrollments, users, courses] = await Promise.all([
          firestoreService.fetchDocs(Docs.ENROLLMENTS),
          firestoreService.fetchDocs(Docs.USERS),
          firestoreService.fetchDocs(Docs.COURSES),
        ]);

        console.log("Fetched Enrollments ->", enrollments);
        console.log("Fetched Users ->", users);
        console.log("Fetched Courses ->", courses);

        // Create a map of userId -> userName
        const userMap: Record<string, string> = {};
        users.forEach((user) => {
          userMap[user.id] = user.name || "Unknown User";
        });

        // Create a map of courseId -> courseTitle
        const courseMap: Record<string, string> = {};
        courses.forEach((course) => {
          courseMap[course.id] = course.title || "Unknown Course";
        });

        // Process enrollments into transactions
        const paidTransactions = enrollments
          .filter((enrollment) => enrollment.paymentStatus === "paid")
          .map((enrollment) => ({
            txId: enrollment.id,
            title: courseMap[enrollment.courseId] || "Unknown Course", // Get course name
            user: userMap[enrollment.studentId] || "Unknown User", // Get user name
            date: format(enrollment.enrolledAt?.toDate(), "yyyy-MM-dd"), // Format date
            cost: enrollment.totalPrice.toFixed(2), // Format cost
          }));

        console.log("Recent Transactions ->", paidTransactions);

        // Sort by most recent date
        const sortedTransactions = paidTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(sortedTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useRecentTransactions;
