import { Box, Button, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../components/templates/DataTable";
import { Header } from "../../components/organisms/header/Header";
import { Docs, firestoreService } from "../../services/firestoreService";
import { Course } from "../../data/model";
import { useAuth } from "../../firebase/useAuth";
import { useFileUpload } from "../../supabase/useFileUpload";
import { DeleteConfirmationDialog } from "../../components/templates/DeleteCourseForm";
import { useCourses } from "../../hooks/useCourses";
import CourseDialog from "./CourseDialog";

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

      <CourseDialog
        open={open}
        newCourse={newCourse}
        currentFeaturedImageUrl={currentFeaturedImageUrl}
        currentGalleryImagesUrl={currentGalleryImagesUrl}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onFeaturedImageChange={handleFeaturedImageChange}
        onGalleryImageChange={handleGalleryImageChange}
        handleLevelChange={handleLevelChange}
        handleIsAdsChange={handleIsAdsChange}
      />

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
