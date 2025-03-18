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
import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../../services/firestoreService";
import { Header } from "../../components/organisms/header/Header";
import { tokens } from "../../styles/theme";
import useAboutLecturers, { Lecturer } from "../../hooks/useAboutLecturers";
interface AboutUsHeader {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const ManageAboutUsContent = () => {
  const [content, setContent] = useState<AboutUsHeader>({
    title: "",
    subtitle: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const doc = await firestoreService.fetchDocById(
          Docs.HOME_CONTENT,
          "OWzezYNeCRH9YJMb8rPS"
        );
        if (doc) {
          setContent({
            title: doc.title || "",
            subtitle: doc.subtitle || "",
            imageUrl: doc.imageUrl || "",
          });
        }
      } catch (err) {
        console.error("Error fetching about us content:", err);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleSaveContent = async () => {
    setLoading(true);
    try {
      await firestoreService.updateDoc(
        Docs.HOME_CONTENT,
        "OWzezYNeCRH9YJMb8rPS",
        content
      );
      setOpenEditDialog(false);
    } catch (err) {
      console.error("Error updating about us content:", err);
    }
    setLoading(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lecturers, error, addLecturer, updateLecturer, deleteLecturer } =
    useAboutLecturers();

  const [openEditLecturerDialog, setOpenEditLecturerDialog] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [updatedLecturer, setUpdatedLecturer] = useState({
    name: "",
    job: "",
    avatar: "",
  });

  const handleEditClick = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setUpdatedLecturer({
      name: lecturer.name,
      job: lecturer.job,
      avatar: lecturer.avatar,
    });
    setOpenEditDialog(true);
  };

  const handleSave = async () => {
    if (selectedLecturer) {
      await updateLecturer(selectedLecturer.id, updatedLecturer);
      setOpenEditDialog(false);
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
          onClick={() => setOpenEditDialog(true)}
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
            Hero Section
          </Typography>
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
        <Box
          gridColumn="span 6"
          sx={{ backgroundColor: colors.primary[400] }}
          p="20px"
        >
          <Typography variant="h6" sx={{ my: 3 }}>
            Lecturers Section
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
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
                  onClick={() => handleEditClick(lecturer)}
                >
                  Edit
                </Button>
              </Box>
            ))
          )}
        </Box>
      </Box>
      {/* Edit Content Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit About Us Content</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Subtitle"
            value={content.subtitle}
            onChange={(e) =>
              setContent({ ...content, subtitle: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Hero Image URL"
            value={content.imageUrl}
            onChange={(e) =>
              setContent({ ...content, imageUrl: e.target.value })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
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
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
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
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAboutUsContent;
