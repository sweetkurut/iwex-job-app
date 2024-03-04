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
  const [value, onChange] = useState(new Date());
  const [valueClock, setValueClock] = useState(new Date());
  const { id } = useParams();
  let { state } = useLocation();
  const dispatch = useDispatch();

  const getTime = (e, name) => {
    if (e) {
      const hours = e.hour().toString().padStart(2, "0");
      const minutes = e.minute().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
      setValueClock((prevData) => ({
        ...prevData,
        [name]: timeString,
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setValueClock(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const date = value.toString().split("T")[0];
    const time = valueClock.time;

    const data = {
      user: id,
      vacancy: state.id_vacancy,
      date: date,
      time: time,
      interviews_date: value,
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
        <Calendar className={s.calendar} onChange={onChange} value={value} />
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
            onChange={(time) => getTime(time, "time")}
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
