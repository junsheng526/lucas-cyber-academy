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
} from "@mui/material";
import { useState, useEffect } from "react";
import { firestoreService, Docs } from "../../services/firestoreService";
import { Header } from "../../components/organisms/header/Header";
import { tokens } from "../../styles/theme";

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
  logo: string;
  address: string; // ✅ NEW FIELD
  email: string; // ✅ NEW FIELD
  phone: string; // ✅ NEW FIELD
  videos: VideoType[];
}

const ManageHomeContent = () => {
  const [content, setContent] = useState<HomeContent>({
    title: "",
    subtitle: "",
    buttonText: "",
    imageUrl: "",
    logo: "",
    address: "", // ✅ Default Empty
    email: "", // ✅ Default Empty
    phone: "", // ✅ Default Empty
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
            logo: doc.logo || "",
            address: doc.address || "", // ✅ Fetch Address
            email: doc.email || "", // ✅ Fetch Email
            phone: doc.phone || "", // ✅ Fetch Phone
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" maxWidth="100wh">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CONTENT MANAGEMENT" subtitle="Manage Website Content" />
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
        </Box>

        <Box
          gridColumn="span 6"
          sx={{ backgroundColor: colors.primary[400] }}
          p="20px"
        >
          {/* ✅ Logo Section */}
          <Typography variant="h6" sx={{ mt: 5 }}>
            Logo
          </Typography>
          <img
            src={content.logo}
            alt="Logo"
            style={{ width: "150px", marginTop: "10px", borderRadius: "5px" }}
          />

          {/* ✅ New Contact Info Section */}
          <Typography variant="h6" sx={{ mt: 5 }}>
            Contact Information
          </Typography>
          <Typography>
            <strong>Address:</strong> {content.address}
          </Typography>
          <Typography>
            <strong>Email:</strong> {content.email}
          </Typography>
          <Typography>
            <strong>Phone:</strong> {content.phone}
          </Typography>
        </Box>
      </Box>

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
          <TextField
            label="Logo URL"
            value={content.logo}
            onChange={(e) => setContent({ ...content, logo: e.target.value })}
            fullWidth
          />

          {/* ✅ New Contact Fields */}
          <TextField
            label="Address"
            value={content.address}
            onChange={(e) =>
              setContent({ ...content, address: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Email"
            value={content.email}
            onChange={(e) => setContent({ ...content, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Phone"
            value={content.phone}
            onChange={(e) => setContent({ ...content, phone: e.target.value })}
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
