import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { firestoreService } from "../../services/firestoreService";
import { useAuth } from "../../hooks/useAuth";
import { useFileUpload } from "../../hooks/useFileUpload";
import { User } from "../../types/user";

const EditProfile: React.FC = () => {
  const user = useAuth();
  const { uploading, error, uploadFiles } = useFileUpload();
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user?.uid) {
      fetchUserProfile(user.uid);
    }
  }, [user]);

  const fetchUserProfile = async (userId: string) => {
    const userData: User = await firestoreService.fetchDocById("users", userId);
    if (userData) {
      setFullName(userData.name);
      setRole(userData.role);
      setProfileImage(userData.profileImage);
      setEmail(userData.email);

      console.log("Check user -> " + JSON.stringify(userData));
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user?.uid) {
      const uploadedUrl = await uploadFiles([file], user.uid);
      if (uploadedUrl) {
        setProfileImage(uploadedUrl[0]);
      }
    }
  };

  const handleSave = async () => {
    if (user?.uid) {
      await firestoreService.updateDoc("users", user.uid, {
        fullName,
        role,
        profileImage,
      });
      alert("Profile updated successfully!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Avatar
          src={profileImage || "/default-avatar.png"}
          sx={{ width: 100, height: 100 }}
          alt="Profile Image"
        >
          {profileImage ? null : (
            <Typography variant="body1">No Image</Typography>
          )}
        </Avatar>
        {/* <img src={profileImage} alt="Profile Image" /> */}

        <Typography variant="h5" mt={2}>
          Edit Profile
        </Typography>
        <Typography variant="body1" mt={1}>
          {email || user?.email}
        </Typography>

        {/* Image Upload Button */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: "16px" }}
        />

        {/* Show loading indicator when uploading */}
        {uploading && <CircularProgress />}

        {/* Display error message if any */}
        {error && <Typography color="error">{error}</Typography>}

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Role"
          variant="outlined"
          margin="normal"
          value={role}
          disabled
          onChange={(e) => setRole(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfile;
