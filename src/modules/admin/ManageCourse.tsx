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
import { coursesListing } from "../../data/jsons/coursesListing";

const ManageCourses = () => {
  // useEffect(() => {
  //   let data = coursesListing;
  //   const insert = async () => {
  //     for (let i = 0; i < data.length; i++) {
  //       console.log("Inserting data -> " + data[i].title);
  //       const newCourseId = await firestoreService.insertDoc(
  //         Docs.COURSES,
  //         data[i]
  //       );
  //     }
  //   };
  //   insert();
  // }, []);
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
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "lessons", headerName: "Lessons", flex: 1 },
    { field: "level", headerName: "Level", flex: 1 },
    { field: "isAds", headerName: "Is Ads", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1.5 },
    { field: "modifiedAt", headerName: "Modified At", flex: 1.5 },
    { field: "href", headerName: "Course Link", flex: 1 },
    {
      field: "featuredImage",
      headerName: "Featured Image",
      flex: 2,
      renderCell: (params) => {
        const fileName = params.value?.split("/").pop(); // Extract file name from the URL
        return <span>{fileName}</span>; // Display the file name
      },
    },
    {
      field: "galleryImgs",
      headerName: "Gallery Image",
      flex: 2,
      renderCell: (params) => {
        const galleryFileNames = params.value?.map((url: string) =>
          url.split("/").pop()
        ); // Extract file names from the gallery image URLs
        return galleryFileNames ? galleryFileNames.join(", ") : "";
      },
    },
    { field: "tags", headerName: "Tags", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
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

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only PNG, JPG, and JPEG files are allowed.");
    }

    // Upload the file using the uploadFiles function
    const uploadedUrls = await uploadFiles([file], user?.uid);

    // If the upload fails (uploadedUrls is null), throw an error
    if (!uploadedUrls) {
      throw new Error("Failed to upload the file.");
    }

    // Return the first URL since it's a single file upload
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

  const handleUpdateCourse = async () => {
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
        newCourse.galleryImgs = [...galleryUrls]; // Combine with existing images
      }

      // If no new images were uploaded, ensure the course fields reflect null or empty arrays
      if (!featuredImageFile && !currentFeaturedImageUrl) {
        newCourse.featuredImage = ""; // Set featured image to null if removed
      }

      if (!galleryImageFiles && currentGalleryImagesUrl.length === 0) {
        newCourse.galleryImgs = []; // Set gallery images to empty array if removed
      }

      // Update the course data in Firestore
      const { id, ...courseData } = newCourse;
      await firestoreService.updateDoc(Docs.COURSES, id as string, courseData);

      // since already upload to firebase, clear the local uploaded files state
      // the local url
      setGalleryImageFiles([]);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...courseData } : course
        )
      );

      // Reset and close modal after updating
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFeaturedImage = () => {
    setCurrentFeaturedImageUrl(null);
    setFeaturedImageFile(null);
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      featuredImage: "",
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updatedGalleryImages = [...currentGalleryImagesUrl];
    updatedGalleryImages.splice(index, 1);
    // Update the preview state
    setCurrentGalleryImagesUrl(updatedGalleryImages);
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      galleryImgs: updatedGalleryImages,
    }));
  };

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the file locally
      const previewUrl = URL.createObjectURL(file);

      // If there's already a featured image, keep the old one and add the new one
      if (currentFeaturedImageUrl) {
        // Combine the previous image with the new one
        setFeaturedImageFile(file);
      } else {
        // Otherwise, just set the new image
        setFeaturedImageFile(file);
      }

      setCurrentFeaturedImageUrl(previewUrl); // Update state with the preview URL
    }
  };

  // Gallery Image Handler
  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files); // Convert FileList to array
      const totalFilesCount =
        currentGalleryImagesUrl.length + newFilesArray.length;

      if (totalFilesCount > 9) {
        alert("You cannot upload more than 9 gallery images.");
        return;
      }

      // Combine new gallery images with existing ones
      const newFileUrls = newFilesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setGalleryImageFiles((prevFiles) => [...prevFiles, ...newFilesArray]);

      setCurrentGalleryImagesUrl((prevImages) => [
        ...prevImages,
        ...newFileUrls,
      ]);
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
                  <button
                    type="button"
                    onClick={handleRemoveFeaturedImage}
                    style={{
                      backgroundColor: "#FF6347",
                      border: "none",
                      color: "white",
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      fontSize: "14px",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Remove Featured Image
                  </button>
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
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          backgroundColor: "rgba(255, 99, 71, 0.8)",
                          border: "none",
                          color: "white",
                          padding: "4px 8px",
                          cursor: "pointer",
                          borderRadius: "4px",
                          fontSize: "12px",
                          opacity: "0.9",
                          transition: "opacity 0.3s",
                        }}
                      >
                        Remove
                      </button>
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
