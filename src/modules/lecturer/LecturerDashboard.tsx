import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useAuth } from "../../hooks/useAuth";
import {
  useLecturerProgress,
  LecturerProgressData,
} from "../../hooks/useLecturerProgress";
import ProgressCircle from "../../components/organisms/ProgressCircle";

const LecturerDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useAuth(); // ✅ Authenticated lecturer
  const { lecturerProgress, loading } = useLecturerProgress(user?.uid);

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.grey[100]} mb={2}>
        Your Course Performance
      </Typography>

      {loading ? (
        <Typography>Loading progress...</Typography>
      ) : lecturerProgress.length === 0 ? (
        <Typography>No courses assigned.</Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
          {lecturerProgress.map((course: LecturerProgressData) => (
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
                {course.courseTitle}
              </Typography>

              {/* 🔥 Add Progress Circle */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size={125} progress={course.averageProgress} />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  {Math.round(course.averageProgress * 100)}%
                </Typography>
                <Typography>Avg Progress</Typography>
              </Box>

              <Typography mt="10px">
                {course.totalEnrollments} Enrollments
              </Typography>

              <Typography mt="10px">
                ⭐ {course.averageRating.toFixed(1)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LecturerDashboard;
