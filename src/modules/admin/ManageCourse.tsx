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
  DialogContentText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/templates/DataTable";
import { Header } from "../../components/organisms/header/Header";
import { Docs, firestoreService } from "../../services/firestoreService";
import { Course } from "../../data/model";
import { useAuth } from "../../firebase/useAuth";
import { useFileUpload } from "../../supabase/useFileUpload";

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false); // For managing the modal state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // For delete confirmation
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
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<FileList | null>(
    null
  );
  const user = useAuth();
  const { uploading, fileUrl, uploadFiles } = useFileUpload();
  const [currentFeaturedImage, setCurrentFeaturedImage] = useState<
    string | null
  >(newCourse.featuredImage || null);
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>(
    newCourse.galleryImgs || []
  );

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
    { field: "featuredImage", headerName: "Featured Image", flex: 2 },
    { field: "galleryImgs", headerName: "Gallery Image", flex: 2 },
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
      setError("Failed to delete the course.");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await firestoreService.fetchDocs(Docs.COURSES);
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    resetForm(); // Reset the form when opening the modal for a new course
  };

  const handleClose = () => {
    setOpen(false);
    resetForm(); // Reset the form when closing the modal, ensuring no lingering data
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
    setCurrentFeaturedImage(course.featuredImage || null); // Set the existing featured image for preview
    setCurrentGalleryImages(course.galleryImgs || []);
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

  const handleFileUpload = async (
    file: File,
    path: string
  ): Promise<string> => {
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
      // Handle Featured Image Upload
      if (featuredImageFile) {
        const imageUrl = await handleFileUpload(
          featuredImageFile,
          `courses/${featuredImageFile.name}`
        );
        newCourse.featuredImage = imageUrl; // Store the returned URL in newCourse
      }

      // Handle Gallery Images Upload (Multiple)
      if (galleryImageFiles) {
        const galleryUrls = await Promise.all(
          Array.from(galleryImageFiles).map((file) =>
            handleFileUpload(file, `courses/gallery/${file.name}`)
          )
        );
        newCourse.galleryImgs = galleryUrls; // Store the array of URLs in newCourse
      }

      // Proceed with adding the course data to Firestore
      const { id, ...courseData } = newCourse;
      const newCourseId = await firestoreService.insertDoc(
        Docs.COURSES,
        courseData
      );
      setCourses((prevCourses) => [
        ...prevCourses,
        { id: newCourseId, ...courseData },
      ]);

      // Reset and close modal after adding
      setOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to add the course.");
      console.error(err);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      // Handle Featured Image Upload if a new one is provided
      if (featuredImageFile) {
        const imageUrl = await handleFileUpload(
          featuredImageFile,
          `courses/${featuredImageFile.name}`
        );
        newCourse.featuredImage = imageUrl; // Set the new image URL
      }

      // Handle Gallery Images Upload if new ones are provided
      if (galleryImageFiles) {
        const galleryUrls = await Promise.all(
          Array.from(galleryImageFiles).map((file) =>
            handleFileUpload(file, `courses/gallery/${file.name}`)
          )
        );
        newCourse.galleryImgs = galleryUrls; // Set the new gallery image URLs
      }

      // If no new images were uploaded, ensure the course fields reflect null or empty arrays
      if (!featuredImageFile && !currentFeaturedImage) {
        newCourse.featuredImage = ""; // Set featured image to null if removed
      }

      if (!galleryImageFiles && currentGalleryImages.length === 0) {
        newCourse.galleryImgs = []; // Set gallery images to empty array if removed
      }

      // Update the course data in Firestore
      const { id, ...courseData } = newCourse;
      await firestoreService.updateDoc(Docs.COURSES, id as string, courseData);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id ? { ...course, ...courseData } : course
        )
      );

      // Reset and close modal after updating
      setOpen(false);
      resetForm();
    } catch (err) {
      setError("Failed to update the course.");
      console.error(err);
    }
  };

  const handleRemoveFeaturedImage = () => {
    setCurrentFeaturedImage(null); // Remove the preview from UI
    setFeaturedImageFile(null); // Clear the uploaded file state
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      featuredImage: "",
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updatedGalleryImages = [...currentGalleryImages];
    updatedGalleryImages.splice(index, 1); // Remove the image at the selected index
    setCurrentGalleryImages(updatedGalleryImages); // Update the preview state
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      galleryImgs: updatedGalleryImages, // Remove the gallery image from the course
    }));
  };

  const handleFeaturedImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview the file locally
      const previewUrl = URL.createObjectURL(file);
      setFeaturedImageFile(file);
      setCurrentFeaturedImage(previewUrl); // Update state with the preview URL
    }
  };

  // Gallery Image Handler
  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setGalleryImageFiles(files);
      setCurrentGalleryImages(fileUrls); // Update the gallery images preview
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
              {currentFeaturedImage && (
                <div>
                  <img
                    src={currentFeaturedImage}
                    alt="Featured"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <button type="button" onClick={handleRemoveFeaturedImage}>
                    Remove Featured Image
                  </button>
                </div>
              )}
              <input
                accept="image/*"
                type="file"
                onChange={handleFeaturedImageChange} // Using handler function
              />
            </Grid>

            {/* Gallery Images Preview */}
            <Grid item xs={12}>
              {currentGalleryImages.length > 0 && (
                <div>
                  {currentGalleryImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Gallery Image ${index + 1}`}
                        style={{ width: "100px", height: "auto" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
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
                onChange={handleGalleryImageChange} // Using handler function
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCourses;
