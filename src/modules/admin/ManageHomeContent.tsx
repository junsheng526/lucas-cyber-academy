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
  videos: VideoType[];
}

const ManageHomeContent = () => {
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    imageUrl: "",
    videos: [],
  });
  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [newVideo, setNewVideo] = useState<VideoType>({
    id: "",
    title: "",
    thumbnail: "",
  });

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
            videos: doc.videos || [], // Ensure videos is always an array
          });
        }
      } catch (err) {
        console.error("Error fetching home content:", err);
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  // Save Hero Section & Video Data
  const handleSaveContent = async () => {
    setLoading(true);
    try {
      await firestoreService.updateDoc(
        Docs.HOME_CONTENT,
        "CtFtz97Oedq4TQKFcCFm",
        content
      );
      setOpenEditDialog(false);
      setOpenVideoDialog(false);
    } catch (err) {
      console.error("Error updating home content:", err);
    }
    setLoading(false);
  };

  // Add New Video
  const handleAddVideo = () => {
    if (!newVideo.id || !newVideo.title || !newVideo.thumbnail) return;
    setContent({ ...content, videos: [...content.videos, newVideo] });
    setNewVideo({ id: "", title: "", thumbnail: "" });
  };

  // Delete Video
  const handleDeleteVideo = (index: number) => {
    const updatedVideos = content.videos.filter((_, i) => i !== index);
    setContent({ ...content, videos: updatedVideos });
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
        <strong>Image:</strong>
      </Typography>
      <img
        src={content.imageUrl}
        alt="Hero"
        style={{ width: "100%", maxWidth: "400px", marginTop: "10px" }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => setOpenEditDialog(true)}
      >
        Edit Hero Section
      </Button>

      {/* Video Section */}
      <Typography variant="h6" sx={{ mt: 5 }}>
        Video Section
      </Typography>
      {content.videos.map((video, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ my: 1 }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{ width: "80px", borderRadius: "5px" }}
          />
          <Typography>{video.title}</Typography>
          <IconButton onClick={() => handleDeleteVideo(index)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setOpenVideoDialog(true)}
      >
        Edit Videos
      </Button>

      {/* Edit Hero Section Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Hero Section</DialogTitle>
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
            label="Image URL"
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

      {/* Edit Video Section Dialog */}
      <Dialog open={openVideoDialog} onClose={() => setOpenVideoDialog(false)}>
        <DialogTitle>Edit Videos</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {content.videos.map((video, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2}>
              <TextField
                label="Title"
                value={video.title}
                onChange={(e) => {
                  const updatedVideos = [...content.videos];
                  updatedVideos[index].title = e.target.value;
                  setContent({ ...content, videos: updatedVideos });
                }}
                fullWidth
              />
              <IconButton onClick={() => handleDeleteVideo(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          ))}

          <Typography>Add New Video</Typography>
          <TextField
            label="YouTube Video ID"
            value={newVideo.id}
            onChange={(e) => setNewVideo({ ...newVideo, id: e.target.value })}
            fullWidth
          />
          <TextField
            label="Title"
            value={newVideo.title}
            onChange={(e) =>
              setNewVideo({ ...newVideo, title: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Thumbnail URL"
            value={newVideo.thumbnail}
            onChange={(e) =>
              setNewVideo({ ...newVideo, thumbnail: e.target.value })
            }
            fullWidth
          />
          <Button onClick={handleAddVideo} variant="outlined">
            Add Video
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVideoDialog(false)}>Cancel</Button>
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
