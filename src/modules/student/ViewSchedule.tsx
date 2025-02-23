import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useStudentSchedule } from "../../hooks/useStudentSchedule";
import { Header } from "../../components/organisms/header/Header";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

const ViewSchedule = () => {
  const { studentEvents, loading } = useStudentSchedule();

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
    </Box>
  );
};

export default ViewSchedule;
