import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
} from "@mui/material";
import {
  ScheduleEvent,
  useStudentSchedule,
} from "../../hooks/useStudentSchedule";
import { Header } from "../../components/organisms/header/Header";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import { useState } from "react";

const ViewSchedule = () => {
  const { studentEvents, loading } = useStudentSchedule();

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

  return (
    <Box m="20px">
      <Header title="View Schedule" subtitle="Your Course Schedule" />
      <Box display="flex" justifyContent="space-between">
        {/* Sidebar */}
        <Box
          flex="1 1 20%"
          p="15px"
          sx={{ backgroundColor: "#f4f4f4", borderRadius: "4px" }}
        >
          <Typography variant="h5">Your Scheduled Courses</Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <List>
              {studentEvents.map((event) => (
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
          )}
        </Box>

        {/* Student Schedule View */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,listMonth",
            }}
            initialView="dayGridMonth"
            events={studentEvents}
            selectable={false}
            editable={false}
          />
        </Box>
      </Box>
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

export default ViewSchedule;
