import {
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
import { Course } from "../../data/model";

type CourseDialogProps = {
  open: boolean;
  newCourse: Course;
  currentFeaturedImageUrl: string | null;
  currentGalleryImagesUrl: string[];
  onClose: () => void;
  onSubmit: (course: Course) => void;
  onFeaturedImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLevelChange: (
    e: SelectChangeEvent<"Beginner" | "Intermediate" | "Advanced">
  ) => void;
  handleIsAdsChange: (e: SelectChangeEvent<string>) => void;
};

const CourseDialog: React.FC<CourseDialogProps> = ({
  open,
  newCourse,
  currentFeaturedImageUrl,
  currentGalleryImagesUrl,
  onClose,
  onSubmit,
  onFeaturedImageChange,
  onGalleryImageChange,
  handleLevelChange,
  handleIsAdsChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {newCourse.id ? "Update Course" : "Create New Course"}
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
              onChange={(e) =>
                onSubmit({ ...newCourse, title: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={newCourse.description}
              onChange={(e) =>
                onSubmit({ ...newCourse, description: e.target.value })
              }
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
              onChange={onFeaturedImageChange}
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
              onChange={onGalleryImageChange}
              style={{ display: "block", marginTop: "8px" }}
            />
          </Grid>

          {/* Other course details */}
          <Grid item xs={12}>
            <TextField
              label="Course Link"
              variant="outlined"
              fullWidth
              name="href"
              value={newCourse.href}
              onChange={(e) => onSubmit({ ...newCourse, href: e.target.value })}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="category"
              value={newCourse.category}
              onChange={(e) =>
                onSubmit({ ...newCourse, category: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={newCourse.price}
              onChange={(e) =>
                onSubmit({ ...newCourse, price: parseFloat(e.target.value) })
              }
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
              onChange={(e) =>
                onSubmit({ ...newCourse, duration: e.target.value })
              }
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
              onChange={(e) =>
                onSubmit({ ...newCourse, lessons: parseInt(e.target.value) })
              }
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
                value={newCourse.isAds !== null ? String(newCourse.isAds) : ""}
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit(newCourse)} color="primary">
          {newCourse.id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDialog;
