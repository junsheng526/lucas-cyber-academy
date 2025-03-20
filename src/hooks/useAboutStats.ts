import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../services/firestoreService";

export interface Stat {
  id: string;
  heading: string;
  subHeading: string;
}

const useAboutStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const statsSnapshot = await firestoreService.fetchDocs(
          Docs.STATS_CONTENT
        );
        const statsData = statsSnapshot.map((doc) => ({ id: doc.id, ...doc }));
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics.");
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const addStat = async (statData: Omit<Stat, "id">) => {
    try {
      const newDoc = await firestoreService.insertDoc(
        Docs.STATS_CONTENT,
        statData
      );
      setStats([...stats, { id: newDoc, ...statData }]);
    } catch (error) {
      console.error("Error adding statistic:", error);
    }
  };

  const updateStat = async (id: string, updatedData: Partial<Stat>) => {
    try {
      await firestoreService.updateDoc(Docs.STATS_CONTENT, id, updatedData);
      setStats(
        stats.map((stat) =>
          stat.id === id ? { ...stat, ...updatedData } : stat
        )
      );
    } catch (err) {
      console.error("Error updating statistic:", err);
    }
  };

  const deleteStat = async (id: string) => {
    try {
      await firestoreService.deleteDoc(Docs.STATS_CONTENT, id);
      setStats(stats.filter((statData) => statData.id !== id));
    } catch (error) {
      console.error("Error deleting statistic:", error);
    }
  };

  return { stats, loading, error, addStat, updateStat, deleteStat };
};

export default useAboutStats;
