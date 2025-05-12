import { useState } from "react";
import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarProps {
  onDateTimeSelected: (date: Date, time: string) => void;
  providerId: string;
}

const Calendar = ({ onDateTimeSelected, providerId }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  // Mock time slots - in a real app, these would come from the API based on provider availability
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "1:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
  ]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);

    // In a real app, we would fetch available time slots for this date and provider
    // For now, we'll just simulate different availability
    if (date) {
      const day = date.getDay();
      const newTimeSlots = timeSlots.map((slot) => ({
        ...slot,
        available: day !== 0 && day !== 6, // Weekends are not available
      }));
      setTimeSlots(newTimeSlots);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate) {
      // Parse the time string
      const [hourStr, minuteStr] = time
        .replace(/(AM|PM)/, "")
        .trim()
        .split(":");
      const isPM = time.includes("PM");

      let hour = parseInt(hourStr);
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;

      const minute = parseInt(minuteStr);

      // Set the time in the selectedDate
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(hour, minute);

      // Call the callback with the date and time
      onDateTimeSelected(dateWithTime, time);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={0}
        sx={{ p: 2, mb: 2, bgcolor: "white", borderRadius: 2 }}
      >
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Select Date and Time
        </Typography>

        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            width: "100%",
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "#007BFF",
            },
          }}
        />

        {selectedDate && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Citas disponibles para {format(selectedDate, "MMMM d, yyyy")}:
            </Typography>
            <Grid container spacing={1} mt={1}>
              {timeSlots.map((slot, index) => (
                <Grid size={4} key={index}>
                  <Button
                    variant={selectedTime ? "outlined" : "contained"}
                    color="info"
                    disabled={!slot.available}
                    fullWidth
                    size="small"
                    onClick={() => handleTimeSelect(slot.time)}
                    sx={{
                      textTransform: "none",
                      bgcolor: slot.available
                        ? undefined
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    {slot.time}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default Calendar;
