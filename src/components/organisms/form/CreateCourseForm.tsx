import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

interface CreateCourseFormProps {
  onSubmit: (course: any) => void;
  onClose: () => void;
  open: boolean;
}

const CreateCourseForm = ({
  onSubmit,
  onClose,
  open,
}: CreateCourseFormProps) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    featuredImage: "",
    href: "",
    category: { id: "", name: "" },
    price: { amount: 0, currency: "USD" },
    duration: "",
    lessons: 0,
    level: "Beginner",
    tags: [],
    isAds: false,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    maxSeat: 30,
    currentEnrollments: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(newCourse);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Course</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Course Title"
          name="title"
          fullWidth
          value={newCourse.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          value={newCourse.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Featured Image URL"
          name="featuredImage"
          fullWidth
          value={newCourse.featuredImage}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Course Link (href)"
          name="href"
          fullWidth
          value={newCourse.href}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Duration"
          name="duration"
          fullWidth
          value={newCourse.duration}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Lessons"
          name="lessons"
          type="number"
          fullWidth
          value={newCourse.lessons}
          onChange={handleChange}
        />
        <TextField
          select
          margin="dense"
          label="Level"
          name="level"
          fullWidth
          value={newCourse.level}
          onChange={handleChange}
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseForm;
