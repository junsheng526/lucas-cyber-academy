import { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { firestoreService, Docs } from "../../services/firestoreService";
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../../components/organisms/header/Header";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { ScheduleEvent } from "../../hooks/useStudentSchedule";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";

const ManageSchedule = () => {
  const user = useAuth();
  const { courses } = useCourses();
  const [currentEvents, setCurrentEvents] = useState<ScheduleEvent[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent>();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEvent(undefined);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (user && courses.length > 0) {
      fetchLecturerSchedules();
    }
  }, [user, courses]); // Wait for courses to be available

  const fetchLecturerSchedules = async () => {
    if (!user || courses.length === 0) return; // Ensure courses are loaded

    try {
      const schedules = await firestoreService.fetchDocs(Docs.COURSE_SCHEDULES);
      const lecturerSchedules = schedules.filter(
        (schedule) => schedule.lecturerId === user.uid
      );

      const formattedEvents = lecturerSchedules.map((schedule) => {
        const course = courses.find((c) => c.id === schedule.courseId);
        return {
          id: schedule.id,
          title: course ? course.title : "Unknown Course", // Prevent missing title
          start: schedule.startTime,
          end: schedule.endTime,
        };
      });

      setCurrentEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleDateClick = (selected: any) => {
    setSelectedDate(selected.startStr);
    setOpenDialog(true);
  };

  const handleSaveSchedule = async () => {
    if (!user || !selectedCourse || !selectedDate || !selectedTime) return;

    // Convert selectedDate & selectedTime to Malaysia timezone
    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const malaysiaTimeOffset = 8 * 60; // UTC+8 offset in minutes
    startDateTime.setMinutes(startDateTime.getMinutes() + malaysiaTimeOffset); // Adjust to Malaysia time

    const course = courses.find((c) => c.id === selectedCourse);
    const durationInWeeks = course?.duration
      ? parseInt(course.duration.split(" ")[0], 10) // Extract number from "10 weeks"
      : 4; // Default to 4 weeks if missing

    const eventSeries = [];

    for (let i = 0; i < durationInWeeks; i++) {
      const eventStart = new Date(startDateTime);
      eventStart.setDate(eventStart.getDate() + i * 7); // Move event forward by 7 days

      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventEnd.getHours() + 2); // Assume each session lasts 2 hours

      const newSchedule = {
        lecturerId: user.uid,
        courseId: selectedCourse,
        startTime: eventStart.toISOString(), // Store as ISO but converted to MYT
        endTime: eventEnd.toISOString(),
      };

      // Save each week's event separately in Firestore
      const savedSchedule: any = await firestoreService.insertDoc(
        Docs.COURSE_SCHEDULES,
        newSchedule
      );

      eventSeries.push({
        id: savedSchedule.id,
        title: course?.title || "Unknown Course",
        start: eventStart.toISOString(),
        end: eventEnd.toISOString(),
      });
    }

    setCurrentEvents([...currentEvents, ...eventSeries]);
    setOpenDialog(false);
    window.location.reload();
  };

  const handleEventClick = (selected: any) => {
    if (window.confirm(`Delete event '${selected.event.title}'?`)) {
      firestoreService.deleteDoc(Docs.COURSE_SCHEDULES, selected.event.id);
      setCurrentEvents(
        currentEvents.filter((event) => event.id !== selected.event.id)
      );
    }
  };

  return (
    <Box m="20px">
      <Header title="Manage Schedule" subtitle="Manage Course Schedule" />
      <Box display="flex" justifyContent="space-between">
        {/* Sidebar */}
        <Box
          flex="1 1 20%"
          p="15px"
          sx={{ backgroundColor: "#f4f4f4", borderRadius: "4px" }}
        >
          <Typography variant="h5">Scheduled Courses</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: "#90caf9",
                  margin: "10px 0",
                  borderRadius: "4px",
                }}
                onClick={() => handleOpenDialog(event)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* ManageSchedule */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
      {/* Assign Course Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Assign Course Time</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 300,
          }}
        >
          <Typography>
            Select a course and time for{" "}
            {formatDate(selectedDate, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Course</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses
                .filter((course) => course.lecturerId === user?.uid)
                .map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* Time Picker Input */}
          <TextField
            label="Select Time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSchedule}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Course Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography variant="h6">{selectedEvent.title}</Typography>
              <Typography>
                Date:{" "}
                {formatDate(selectedEvent.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
              <Typography>
                Time:{" "}
                {formatDate(selectedEvent.start, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {formatDate(selectedEvent.end, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonPrimary onClick={handleCloseDialog}>Close</ButtonPrimary>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSchedule;
