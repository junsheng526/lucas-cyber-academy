import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useGrayscale } from "../../hooks/useGrayscale";
import { Header } from "../../components/organisms/header/Header";

const ManageGrayscale = () => {
  const { grayscaleConfig, updateGrayscaleConfig } = useGrayscale();
  const [newPage, setNewPage] = useState("");

  const handleToggle = (page: string) => {
    const updatedConfig = {
      ...grayscaleConfig,
      [page]: !grayscaleConfig[page],
    };
    updateGrayscaleConfig(updatedConfig);
  };

  const handleAddPage = () => {
    if (!newPage.trim() || grayscaleConfig[newPage]) return;
    const updatedConfig = { ...grayscaleConfig, [newPage]: false };
    updateGrayscaleConfig(updatedConfig);
    setNewPage("");
  };

  const handleRemovePage = (page: string) => {
    const updatedConfig = { ...grayscaleConfig };
    delete updatedConfig[page];
    updateGrayscaleConfig(updatedConfig);
  };

  return (
    <Box m="20px">
      <Header
        title="Grayscale Settings"
        subtitle="Manage UI Accessibility Settings"
      />

      {/* Add New Page */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <TextField
          label="New Page Name"
          variant="outlined"
          size="small"
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddPage}>
          Add Page
        </Button>
      </Box>

      {/* List of Pages */}
      <List>
        {Object.entries(grayscaleConfig).map(([page, isGrayscale]) => (
          <ListItem
            key={page}
            sx={{ backgroundColor: "#f4f4f4", borderRadius: "4px", mb: 1 }}
          >
            <ListItemText primary={page} />
            <Switch checked={isGrayscale} onChange={() => handleToggle(page)} />
            <IconButton onClick={() => handleRemovePage(page)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ManageGrayscale;
