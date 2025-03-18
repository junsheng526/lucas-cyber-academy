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
    </Box>
  );
};

export default ManageAboutUsContent;
