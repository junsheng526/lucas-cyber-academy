import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/templates/DataTable";
import { useCourses } from "../../hooks/useCourses";
import { firestoreService, Docs } from "../../services/firestoreService";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../types/user";

const ManageEnrollments = () => {
  const { courses } = useCourses();
  const user = useAuth();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState<User[]>([]);

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchEnrollments = async () => {
      try {
        const allEnrollments = await firestoreService.fetchDocs(
          Docs.ENROLLMENTS
        );
        const filteredEnrollments = allEnrollments.filter(
          (enrollment) => enrollment.courseId === selectedCourse
        );

        const studentPromises = filteredEnrollments.map((enrollment) =>
          firestoreService.fetchDocById(Docs.USERS, enrollment.studentId)
        );

        const studentData = await Promise.all(studentPromises);
        setStudents(studentData.filter((student) => student !== null));
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    fetchEnrollments();
  }, [selectedCourse]);

  // Filter courses for the logged-in lecturer
  const lecturerCourses = courses.filter(
    (course) => course.lecturerId === user?.uid
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 2 },
  ];

  return (
    <Box m="20px" maxWidth="100wh">
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Manage Enrollments
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Select Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {lecturerCourses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCourse ? (
        <DataTable columns={columns} rows={students} />
      ) : (
        <Typography>Select a course to view enrolled students.</Typography>
      )}
    </Box>
  );
};

export default ManageEnrollments;
