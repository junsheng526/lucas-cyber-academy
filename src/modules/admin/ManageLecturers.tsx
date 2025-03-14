import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/templates/DataTable";
import { Header } from "../../components/organisms/header/Header";
import { useCourses } from "../../hooks/useCourses";
import { useLecturers } from "../../hooks/useLecturers";
import { Lecturer } from "../../types/model";
import { Docs, firestoreService } from "../../services/firestoreService";

const ManageLecturers = () => {
  const {
    lecturers,
    loading,
    error,
    setLecturers,
    assignCourseToLecturer,
    removeCourseFromLecturer,
  } = useLecturers();
  const { courses } = useCourses();

  // State for dialogs
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [selectedCourse, setSelectedCourse] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "assignedCourses",
      headerName: "Assigned Courses",
      flex: 3,
      renderCell: (params) => (
        <Box display="flex" flexWrap="wrap" gap={1}>
          {(params.value as string[])?.map((courseId) => {
            const course = courses.find((c) => c.id === courseId);
            return (
              <Typography
                key={courseId}
                sx={{
                  backgroundColor: "#f1f1f1",
                  padding: "4px 8px",
                  borderRadius: "12px",
                }}
              >
                {course?.title || "Unknown"}
              </Typography>
            );
          }) || ""}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleOpenRemoveDialog(params.row)}
        >
          Remove Course
        </Button>
      ),
    },
  ];

  const handleAssignCourse = async () => {
    if (!selectedLecturer || !selectedCourse) return;

    try {
      // Fetch the course document
      const courseDoc = await firestoreService.fetchDocById(
        Docs.COURSES,
        selectedCourse
      );

      if (!courseDoc) {
        alert("Course not found");
        return;
      }

      // Check if the course is already assigned to a lecturer
      const existingLecturerId = courseDoc.lecturerId;

      if (existingLecturerId) {
        alert("This course is already assigned to another lecturer.");
        return;
      }

      // Proceed with assigning the course to the lecturer
      await assignCourseToLecturer(
        selectedLecturer.id.toString(),
        selectedCourse
      );

      // Update the lecturer's assignedCourses in the local state
      const updatedLecturers = [...lecturers];
      const lecturerIndex = updatedLecturers.findIndex(
        (lecturer) => lecturer.id === selectedLecturer.id
      );

      if (lecturerIndex !== -1) {
        const lecturer = updatedLecturers[lecturerIndex];
        lecturer.assignedCourses = [
          ...(lecturer.assignedCourses || []),
          selectedCourse,
        ];
        updatedLecturers[lecturerIndex] = lecturer;
      }

      // Update the lecturers state to reflect the new assignment
      setLecturers(updatedLecturers);

      // Reset selected course and close the dialog
      setSelectedCourse("");
      setOpenAssignDialog(false);
      window.location.reload();
    } catch (err) {
      console.error("Error assigning course:", err);
    }
  };

  const handleOpenRemoveDialog = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setOpenRemoveDialog(true);
  };

  const handleRemoveCourse = async (courseId: string) => {
    if (!selectedLecturer) return;

    try {
      await removeCourseFromLecturer(selectedLecturer.id.toString(), courseId);
      window.location.reload();
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  return (
    <Box m="20px" maxWidth="100wh">
      <Header title="LECTURERS" subtitle="Manage Lecturers & Assign Courses" />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => setOpenAssignDialog(true)}
      >
        Assign Course
      </Button>
      <DataTable
        columns={columns}
        rows={lecturers}
        loading={loading}
        error={error}
        getRowHeight={() => "auto"}
      />

      {/* Assign Course Dialog */}
      <Dialog
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      >
        <DialogTitle>Assign Course</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 300,
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Lecturer</InputLabel>
            <Select
              value={selectedLecturer?.id?.toString() || ""}
              onChange={(e) => {
                const lecturer =
                  lecturers.find((l) => l.id.toString() === e.target.value) ||
                  null;
                setSelectedLecturer(lecturer);
              }}
            >
              {lecturers.map((lecturer) => (
                <MenuItem key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses
                .filter((course) => !course.lecturerId)
                .map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignCourse}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Course Dialog */}
      <Dialog
        open={openRemoveDialog}
        onClose={() => setOpenRemoveDialog(false)}
      >
        <DialogTitle>Remove Course</DialogTitle>
        <DialogContent>
          <Typography>
            Select a course to remove from{" "}
            <strong>{selectedLecturer?.name}</strong>:
          </Typography>
          {selectedLecturer?.assignedCourses?.length ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Course</InputLabel>
              <Select
                value=""
                onChange={(e) => handleRemoveCourse(e.target.value)}
              >
                {selectedLecturer.assignedCourses.map((courseId) => {
                  const course = courses.find((c) => c.id === courseId);
                  return (
                    <MenuItem key={courseId} value={courseId}>
                      {course?.title || "Unknown"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <Typography color="textSecondary" sx={{ mt: 2 }}>
              No courses assigned.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageLecturers;
