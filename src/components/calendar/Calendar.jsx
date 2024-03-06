import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import s from "./Calendar.module.sass";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { sendInterviews } from "../../store/slices/employeeDetailsSlice";
import { useLocation, useParams } from "react-router";

const ModalCalendar = ({ open, setOpen }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const { id } = useParams();
  let { state } = useLocation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  console.log(date);
  console.log(time);

  const handleSubmit = async () => {
    // Создаем новый объект Date на основе времени
    const selectedTime = new Date(date);
    selectedTime.setHours(time.getHours(), time.getMinutes());

    // Форматируем дату и время
    const formattedDate = `${date.toLocaleDateString()} ${selectedTime.toLocaleTimeString()}`;

    // Создаем объект data
    const data = {
      user: id,
      vacancy: state.id_vacancy,
      interviews_date: formattedDate,
    };

    try {
      const response = await dispatch(sendInterviews(data)).unwrap();
      console.log(response);
      handleClose(true);
    } catch (error) {
      setOpen(true);
      console.error(error);
    }
  };

  return (
    <Dialog
      style={{ height: 800 }}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle>{"Выберите дату и время"}</DialogTitle>
      <DialogContent>
        <Calendar className={s.calendar} onChange={setDate} value={date} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            slotProps={{
              textField: {
                required: true,
              },
            }}
            name="time_start"
            className={s.input}
            label="Время собеседования:"
            ampm={false}
            value={time}
            onChange={(newValue) => setTime(newValue)}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit}>Отправить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCalendar;
