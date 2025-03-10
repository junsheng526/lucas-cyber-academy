import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../../services/firestoreService";
import { Header } from "../../components/organisms/header/Header";
import DeleteIcon from "@mui/icons-material/Delete";

interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

interface HomeContent {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  logo: string; // ✅ Added logo field
  videos: VideoType[];
}

const ManageHomeContent = () => {
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    imageUrl: "",
    logo: "",
    videos: [],
  });

  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const doc = await firestoreService.fetchDocById(
          Docs.HOME_CONTENT,
          "CtFtz97Oedq4TQKFcCFm"
        );
        if (doc) {
          setContent({
            title: doc.title || "",
            subtitle: doc.subtitle || "",
            buttonText: doc.buttonText || "",
            imageUrl: doc.imageUrl || "",
            logo: doc.logo || "", // ✅ Fetch logo
            videos: doc.videos || [],
          });
        }
      } catch (err) {
        console.error("Error fetching home content:", err);
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
        "CtFtz97Oedq4TQKFcCFm",
        content
      );
      setOpenEditDialog(false);
    } catch (err) {
      console.error("Error updating home content:", err);
    }
    setLoading(false);
  };

  return (
    <Box m="20px" maxWidth="100wh">
      <Header title="HOME CONTENT" subtitle="Manage Home Page Content" />

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
        <strong>Button Text:</strong> {content.buttonText}
      </Typography>
      <Typography>
        <strong>Hero Image:</strong>
      </Typography>
      <img
        src={content.imageUrl}
        alt="Hero"
        style={{ width: "100%", maxWidth: "400px", marginTop: "10px" }}
      />

      {/* ✅ Logo Section */}
      <Typography variant="h6" sx={{ mt: 5 }}>
        Logo
      </Typography>
      <img
        src={content.logo}
        alt="Logo"
        style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => setOpenEditDialog(true)}
      >
        Edit Content
      </Button>

      {/* Edit Content Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Home Content</DialogTitle>
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
            label="Button Text"
            value={content.buttonText}
            onChange={(e) =>
              setContent({ ...content, buttonText: e.target.value })
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
          {/* ✅ Logo Input */}
          <TextField
            label="Logo URL"
            value={content.logo}
            onChange={(e) => setContent({ ...content, logo: e.target.value })}
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
    </Box>
  );
};

export default ManageHomeContent;
