import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/templates/DataTable";
import { Header } from "../../components/organisms/header/Header";
import { Docs, firestoreService } from "../../services/firestoreService";
import { Course } from "../../data/model";
import { useAuth } from "../../firebase/useAuth";
import { useFileUpload } from "../../supabase/useFileUpload";
import { DeleteConfirmationDialog } from "../../components/templates/DeleteCourseForm";
import { useCourses } from "../../hooks/useCourses";

const ManageCourses = () => {
  const { courses, loading, error, setCourses } = useCourses();
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newCourse, setNewCourse] = useState<Course>({
    id: "",
    title: "",
    description: "",
    featuredImage: "",
    href: "",
    category: "",
    price: 0,
    duration: "",
    lessons: 0,
    level: "Beginner",
    tags: [],
    galleryImgs: [],
    isAds: null,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>();
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const user = useAuth();
  const { uploadFiles } = useFileUpload();
  const [currentFeaturedImageUrl, setCurrentFeaturedImageUrl] = useState<
    string | null
  >(newCourse.featuredImage || null);
  const [currentGalleryImagesUrl, setCurrentGalleryImagesUrl] = useState<
    string[]
  >(newCourse.galleryImgs || []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Course Name", flex: 1.5 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "level", headerName: "Level", flex: 1 },
    {
      field: "featuredImage",
      headerName: "Featured Image",
      flex: 2,
      renderCell: (params) => {
        return <img src={params.value} alt="Featured" />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleLevelChange = (
    e: SelectChangeEvent<"Beginner" | "Intermediate" | "Advanced">
  ) => {
    const { value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      level: value as "Beginner" | "Intermediate" | "Advanced",
    }));
  };

  const handleIsAdsChange = (e: SelectChangeEvent<string>) => {
    const value =
      e.target.value === "true"
        ? true
        : e.target.value === "false"
        ? false
        : null;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      isAds: value,
    }));
  };

  const handleDelete = (course: Course) => {
    setCourseToDelete(course);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      if (courseToDelete) {
        await firestoreService.deleteDoc(
          Docs.COURSES,
          courseToDelete.id as string
        );
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseToDelete?.id)
        );
        setOpenDeleteDialog(false);
        setCourseToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOpen = () => {
    setCurrentFeaturedImageUrl(null);
    setCurrentGalleryImagesUrl([]);
    setOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewCourse({
      id: "",
      title: "",
      description: "",
      featuredImage: "",
      href: "",
      category: "",
      price: 0,
      duration: "",
      lessons: 0,
      level: "Beginner",
      tags: [],
      galleryImgs: [],
      isAds: null,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    });
  };

  const handleEdit = (course: Course) => {
    setNewCourse(course);
    // Set the existing featured image for preview
    setCurrentFeaturedImageUrl(course.featuredImage || null);
    setCurrentGalleryImagesUrl(course.galleryImgs || []);
    setOpen(true);
  };

  // Update handleSubmit to ensure course is properly added or updated:
  const handleSubmit = () => {
    if (newCourse.id) {
      handleUpdateCourse();
    } else {
      handleAddCourse();
    }
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only PNG, JPG, and JPEG files are allowed.");
    }

    const uploadedUrls = await uploadFiles([file], user?.uid);

    if (!uploadedUrls) {
      throw new Error("Failed to upload the file.");
    }

    return uploadedUrls[0];
  };

  const handleAddCourse = async () => {
    try {
      if (featuredImageFile) {
        const imageUrl = await handleFileUpload(featuredImageFile);
        newCourse.featuredImage = imageUrl;
      }

      if (galleryImageFiles) {
        const galleryUrls = await Promise.all(
          Array.from(galleryImageFiles).map((file, index) =>
            handleFileUpload(file)
          )
        );
        newCourse.galleryImgs = galleryUrls;
      }

      const { id, ...courseData } = newCourse;
      const newCourseId = await firestoreService.insertDoc(
        Docs.COURSES,
        courseData
      );
      setCourses((prevCourses) => [
        ...prevCourses,
        { id: newCourseId, ...courseData },
      ]);

      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // const handleUpdateCourse = async () => {
  //   try {
  //     if (featuredImageFile) {
  //       const imageUrl = await handleFileUpload(featuredImageFile);
  //       newCourse.featuredImage = imageUrl;
  //     }

  //     if (galleryImageFiles) {
  //       const galleryUrls = await Promise.all(
  //         Array.from(galleryImageFiles).map((file, index) =>
  //           handleFileUpload(file)
  //         )
  //       );
  //       newCourse.galleryImgs = [...galleryUrls]; // Combine with existing images
  //     }

  //     // If no new images were uploaded, ensure the course fields reflect null or empty arrays
  //     if (!featuredImageFile && !currentFeaturedImageUrl) {
  //       newCourse.featuredImage = ""; // Set featured image to null if removed
  //     }

  //     if (!galleryImageFiles && currentGalleryImagesUrl.length === 0) {
  //       newCourse.galleryImgs = []; // Set gallery images to empty array if removed
  //     }

  //     // Update the course data in Firestore
  //     const { id, ...courseData } = newCourse;
  //     await firestoreService.updateDoc(Docs.COURSES, id as string, courseData);

  //     setCourses((prevCourses) =>
  //       prevCourses.map((course) =>
  //         course.id === id ? { ...course, ...courseData } : course
  //       )
  //     );

  //     // Reset and close modal after updating
  //     setOpen(false);
  //     resetForm();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleUpdateCourse = async () => {
    try {
      if (featuredImageFile) {
        const imageUrl = await handleFileUpload(featuredImageFile);
        newCourse.featuredImage = imageUrl;
      }

      if (galleryImageFiles) {
        const galleryUrls = await Promise.all(
          Array.from(galleryImageFiles).map((file) => handleFileUpload(file))
        );
        newCourse.galleryImgs = galleryUrls;
      }

      const { id, ...courseData } = newCourse;
      await firestoreService.updateDoc(Docs.COURSES, id as string, courseData);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...courseData } : course
        )
      );

      setOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      setFeaturedImageFile(file);
      setCurrentFeaturedImageUrl(previewUrl);
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files); // Convert FileList to array

      if (newFilesArray.length > 6) {
        alert("You cannot upload more than 6 gallery images.");
        return;
      }

      // Generate preview URLs for the new images
      const newFileUrls = newFilesArray.map((file) =>
        URL.createObjectURL(file)
      );

      // Overwrite existing images with new ones
      setGalleryImageFiles(newFilesArray);
      setCurrentGalleryImagesUrl(newFileUrls);
    }
  };

  return (
    <Box m="20px">
      <Header title="COURSES" subtitle="Manage Courses" />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Create Course
      </Button>

      <DataTable
        columns={columns}
        rows={courses}
        loading={loading}
        error={error}
        checkboxSelection
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {newCourse ? "Update Course" : "Create New Course"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Course Title"
                variant="outlined"
                fullWidth
                name="title"
                value={newCourse.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                value={newCourse.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            {/* Featured Image Preview */}
            <Grid item xs={12}>
              {currentFeaturedImageUrl && (
                <div style={{ marginBottom: "16px" }}>
                  <img
                    src={currentFeaturedImageUrl}
                    alt="Featured"
                    style={{
                      width: "150px",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      marginRight: "8px",
                    }}
                  />
                </div>
              )}
              <input
                accept="image/*"
                type="file"
                onChange={handleFeaturedImageChange}
                style={{ display: "block", marginTop: "8px" }}
              />
            </Grid>

            {/* Gallery Images Preview */}
            <Grid item xs={12}>
              {currentGalleryImagesUrl.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {currentGalleryImagesUrl.map((imageUrl, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        width: "120px",
                        height: "auto",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #ddd",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Gallery Image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleGalleryImageChange}
                style={{ display: "block", marginTop: "8px" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Course Link"
                variant="outlined"
                fullWidth
                name="href"
                value={newCourse.href}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
                value={newCourse.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                name="price"
                value={newCourse.price}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Duration"
                variant="outlined"
                fullWidth
                name="duration"
                value={newCourse.duration}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Lessons"
                variant="outlined"
                fullWidth
                name="lessons"
                type="number"
                value={newCourse.lessons}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  name="level"
                  value={newCourse.level}
                  onChange={handleLevelChange}
                  label="Level"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Is Ads</InputLabel>
                <Select
                  name="isAds"
                  value={
                    newCourse.isAds !== null ? String(newCourse.isAds) : ""
                  }
                  onChange={handleIsAdsChange}
                  label="Is Ads"
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                  <MenuItem value="">None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {newCourse ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation dialog */}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onDelete={handleDeleteConfirmation}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </Box>
  );
};

export default ManageCourses;
