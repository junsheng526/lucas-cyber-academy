import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import {
  ProgressData,
  useStudentProgress,
} from "../../hooks/useStudentProgress";
import ProgressCircle from "../../components/organisms/ProgressCircle";
import { useAuth } from "../../firebase/useAuth";

const StudentDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useAuth();
  const { coursesProgress, loading } = useStudentProgress(user?.uid);

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.grey[100]} mb={2}>
        Your Course Progress
      </Typography>

      {loading ? (
        <Typography>Loading progress...</Typography>
      ) : coursesProgress.length === 0 ? (
        <Typography>No courses enrolled yet.</Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
          {coursesProgress.map((course: ProgressData) => (
            <Box
              key={course.courseId}
              sx={{
                backgroundColor: colors.primary[400],
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="600">
                {course.name}
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size={125} progress={course.progress} />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  {Math.round(course.progress * 100) + " %"}
                </Typography>
                <Typography>Completed</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StudentDashboard;
