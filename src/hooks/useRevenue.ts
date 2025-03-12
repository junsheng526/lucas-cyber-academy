import { useState, useEffect } from "react";
import { firestoreService } from "../services/firestoreService";
import { Docs } from "../services/firestoreService";
import { format } from "date-fns";

interface RevenueData {
  id: string;
  color: string;
  data: {
    x: string; // Month-Year (e.g., "Jan 2024")
    y: number; // Total revenue for that month
  }[];
}

const useRevenue = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0); // ✅ Add total revenue state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        const enrollments = await firestoreService.fetchDocs(Docs.ENROLLMENTS);

        console.log("enrollments ->", enrollments);

        // Filter only paid enrollments
        const paidEnrollments = enrollments.filter(
          (enrollment) => enrollment.paymentStatus === "paid"
        );

        console.log("paidEnrollments ->", paidEnrollments);

        // Group revenue by month
        const revenueByMonth: Record<string, number> = {};
        let totalRevenueSum = 0; // ✅ Track total revenue

        paidEnrollments.forEach((enrollment) => {
          const date = enrollment.enrolledAt?.toDate(); // Convert Firestore Timestamp to JS Date
          if (!date) return;

          const monthYear = format(date, "MMM yyyy"); // Format as "Jan 2024"

          if (!revenueByMonth[monthYear]) {
            revenueByMonth[monthYear] = 0;
          }

          revenueByMonth[monthYear] += enrollment.totalPrice; // Add revenue
          totalRevenueSum += enrollment.totalPrice; // ✅ Add to total revenue
        });

        console.log("revenueByMonth ->", revenueByMonth);
        console.log("Total Revenue ->", totalRevenueSum);

        // Convert to array for Nivo chart
        const formattedRevenueData = [
          {
            id: "Revenue",
            color: "hsl(220, 90%, 50%)",
            data: Object.entries(revenueByMonth).map(([month, revenue]) => ({
              x: month,
              y: revenue,
            })),
          },
        ];

        setRevenueData(formattedRevenueData);
        setTotalRevenue(totalRevenueSum); // ✅ Set total revenue state
      } catch (err) {
        console.error("Error fetching revenue:", err);
        setError("Failed to fetch revenue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return { revenueData, totalRevenue, loading, error }; // ✅ Return total revenue
};

export default useRevenue;
