import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { Header } from "../../components/organisms/header/Header";
import { tokens } from "../../styles/theme";
import useAboutLecturers, { Lecturer } from "../../hooks/useAboutLecturers";
import useAboutStats, { Stat } from "../../hooks/useAboutStats";
import useAboutContent, { Content } from "../../hooks/useAboutContent";

const ManageAboutUsContent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [openEditContentDialog, setOpenEditContentDialog] = useState(false);
  const [openEditStatDialog, setOpenEditStatDialog] = useState(false);
  const [openEditLecturerDialog, setOpenEditLecturerDialog] = useState(false);
  const {
    lecturers,
    error: lecturersError,
    updateLecturer,
  } = useAboutLecturers();
  const { stats, error: statsError, updateStat } = useAboutStats();
  const { content, error: contentError, updateContent } = useAboutContent();
  const [updatedContent, setUpdatedContent] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
  });
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [updatedLecturer, setUpdatedLecturer] = useState({
    name: "",
    job: "",
    avatar: "",
  });
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [updatedStat, setUpdatedStat] = useState({
    heading: "",
    subHeading: "",
  });

  const handleEditContentClick = (content: Content) => {
    setUpdatedContent({
      title: content.title,
      subtitle: content.subtitle,
      imageUrl: content.imageUrl,
    });
    setOpenEditContentDialog(true);
  };

  const handleSaveContent = async () => {
    if (updatedContent) {
      await updateContent(updatedContent);
      setOpenEditContentDialog(false);
    }
  };

  const handleEditLecturerClick = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setUpdatedLecturer({
      name: lecturer.name,
      job: lecturer.job,
      avatar: lecturer.avatar,
    });
    setOpenEditLecturerDialog(true);
  };

  const handleSaveLecturer = async () => {
    if (selectedLecturer) {
      await updateLecturer(selectedLecturer.id, updatedLecturer);
      setOpenEditLecturerDialog(false);
    }
  };

  const handleEditStatClick = (stat: Stat) => {
    setSelectedStat(stat);
    setUpdatedStat({
      heading: stat.heading,
      subHeading: stat.subHeading,
    });
    setOpenEditStatDialog(true);
  };

  const handleSaveStat = async () => {
    if (selectedStat) {
      await updateStat(selectedStat.id, updatedStat);
      setOpenEditStatDialog(false);
    }
  };

  return (
    <Box m="20px" maxWidth="100wh">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ABOUT US CONTENT MANAGEMENT"
          subtitle="Manage Website Content"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditContentClick(content)}
        >
          Edit Content
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        <Box
          gridColumn="span 6"
          sx={{ backgroundColor: colors.primary[400] }}
          p="20px"
        >
          {/* Hero Section */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            <strong>Hero Section</strong>
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : contentError ? (
            <Typography color="error">{contentError}</Typography>
          ) : (
            <Box gap={2} mb={2} className="justify-between">
              <Typography>
                <strong>Title:</strong> {content.title}
              </Typography>
              <Typography>
                <strong>Subtitle:</strong> {content.subtitle}
              </Typography>
              <Typography>
                <strong>Hero Image:</strong>
              </Typography>
              <img
                src={content.imageUrl}
                alt="Hero"
                style={{ width: "100%", maxWidth: "400px", marginTop: "10px" }}
              />
            </Box>
          )}
        </Box>
        <Box
          gridColumn="span 6"
          sx={{ backgroundColor: colors.primary[400] }}
          p="20px"
        >
          <Typography variant="h6" sx={{ my: 3 }}>
            <strong>Lecturers Section</strong>
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : lecturersError ? (
            <Typography color="error">{lecturersError}</Typography>
          ) : (
            lecturers.map((lecturer) => (
              <Box
                key={lecturer.id}
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
                className="justify-between"
              >
                <div className="flex">
                  <Avatar src={lecturer.avatar} alt={lecturer.name} />
                  <Box className="mx-4">
                    <Typography>
                      <strong>Name:</strong> {lecturer.name}
                    </Typography>
                    <Typography>
                      <strong>Job:</strong> {lecturer.job}
                    </Typography>
                  </Box>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditLecturerClick(lecturer)}
                >
                  Edit
                </Button>
              </Box>
            ))
          )}
        </Box>
        <Box
          gridColumn="span 6"
          sx={{ backgroundColor: colors.primary[400] }}
          p="20px"
        >
          <Typography variant="h6" sx={{ my: 3 }}>
            <strong>Statistics Section</strong>
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : statsError ? (
            <Typography color="error">{statsError}</Typography>
          ) : (
            stats.map((stat, index) => (
              <Box
                key={stat.id}
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
                className="justify-between"
              >
                <div className="flex">
                  <Box className="mx-4">
                    <Typography>
                      <strong>Statistic Box</strong> {index + 1}
                    </Typography>
                    <Typography>
                      <strong>Heading:</strong> {stat.heading}
                    </Typography>
                    <Typography>
                      <strong>Subheading:</strong> {stat.subHeading}
                    </Typography>
                  </Box>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditStatClick(stat)}
                >
                  Edit
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
      {/* Edit Content Dialog */}
      <Dialog
        open={openEditContentDialog}
        onClose={() => setOpenEditContentDialog(false)}
      >
        <DialogTitle>Edit About Us Header</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            value={updatedContent.title}
            onChange={(e) =>
              setUpdatedContent({ ...updatedContent, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Subtitle"
            value={updatedContent.subtitle}
            onChange={(e) =>
              setUpdatedContent({ ...updatedContent, subtitle: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Hero Image URL"
            value={updatedContent.imageUrl}
            onChange={(e) =>
              setUpdatedContent({ ...updatedContent, imageUrl: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditContentDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveContent}
            disabled={loading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditLecturerDialog}
        onClose={() => setOpenEditLecturerDialog(false)}
      >
        <DialogTitle>Edit Lecturer Details</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            value={updatedLecturer.name}
            onChange={(e) =>
              setUpdatedLecturer({ ...updatedLecturer, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Job"
            value={updatedLecturer.job}
            onChange={(e) =>
              setUpdatedLecturer({ ...updatedLecturer, job: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Profile Image URL"
            value={updatedLecturer.avatar}
            onChange={(e) =>
              setUpdatedLecturer({ ...updatedLecturer, avatar: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditLecturerDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveLecturer}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditStatDialog}
        onClose={() => setOpenEditStatDialog(false)}
      >
        <DialogTitle>Edit Statistic Details</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Heading"
            value={updatedStat.heading}
            onChange={(e) =>
              setUpdatedStat({ ...updatedStat, heading: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Sub-Heading"
            value={updatedStat.subHeading}
            onChange={(e) =>
              setUpdatedStat({ ...updatedStat, subHeading: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditStatDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveStat}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAboutUsContent;
