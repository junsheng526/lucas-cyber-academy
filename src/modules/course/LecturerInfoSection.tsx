import { useEffect, useState } from "react";
import Avatar from "../../components/molecules/Avatar";
import ButtonSecondary from "../../components/molecules/button/ButtonSecondary";
import StartRating from "../../components/molecules/StartRating";
import { firestoreService, Docs } from "../../services/firestoreService";
import { DEFAULT_AVATAR } from "./constant";

interface Lecturer {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt?: any;
  rating?: number;
  totalCourses?: number;
}

interface LecturerInfoSectionProps {
  lecturerId: string | null;
}

export const LecturerInfoSection: React.FC<LecturerInfoSectionProps> = ({
  lecturerId,
}) => {
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lecturerId) {
      setLoading(false);
      return;
    }

    const fetchLecturer = async () => {
      try {
        const lecturerData = await firestoreService.fetchDocById(
          Docs.USERS,
          lecturerId
        );
        if (lecturerData) {
          setLecturer({ id: lecturerId, ...lecturerData });
        }
      } catch (error) {
        console.error("Error fetching lecturer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [lecturerId]);

  if (loading) return <p>Loading lecturer information...</p>;
  if (!lecturer) return <p>No lecturer assigned to this course.</p>;

  // Format createdAt date
  const formattedDate = lecturer.createdAt
    ? new Date(lecturer.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Unknown";

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Lecturer Information</h2>
      <div className="w-14 border-b border-neutral-200"></div>

      {/* Lecturer Profile */}
      <div className="flex items-center space-x-4">
        <Avatar
          hasChecked
          hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
          sizeClass="h-14 w-14"
          radius="rounded-full"
          imgUrl={lecturer.profileImage || DEFAULT_AVATAR}
        />
        <div>
          <a className="block text-xl font-medium" href="##">
            {lecturer.name}
          </a>
          <div className="mt-1.5 flex items-center text-sm text-neutral-500">
            <StartRating />
            <span className="mx-2">·</span>
            <span> {lecturer.totalCourses || 0} courses</span>
          </div>
        </div>
      </div>

      {/* Lecturer Details */}
      <span className="block text-neutral-600">
        {lecturer.name} is an expert in the field, dedicated to providing
        quality education.
      </span>

      {/* Additional Info */}
      <div className="block text-neutral-500 space-y-2.5">
        <div className="flex items-center space-x-3">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Joined in {formattedDate}</span>
        </div>
      </div>

      <div className="w-14 border-b border-neutral-200"></div>
      <div>
        <ButtonSecondary>See Profile</ButtonSecondary>
      </div>
    </div>
  );
};
