import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import s from "./Calendar.module.sass";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { sendInterviews } from "../../store/slices/employeeDetailsSlice";
import { useLocation, useParams } from "react-router";
import { getVacancyEmployer } from "../../store/slices/vacancySlice";

const ModalCalendar = ({ open, setOpen, page, selected }) => {
  const { vacancyEmployer } = useSelector((state) => state.vacancy);
  const [value, onChange] = useState(new Date());
  const [valueClock, setValueClock] = useState(new Date());
  const { id } = useParams();
  let { state } = useLocation();
  const dispatch = useDispatch();
  const [id_vacancy, set_id_vacancy] = useState(state?.id_vacancy);
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
    dispatch(getVacancyEmployer());
  }, [dispatch]);

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
    if (!id_vacancy) {
      console.error("Ошибка: объект state или свойство id_vacancy отсутствует.");
      return;
    }

    const data = {
      user: id || selected,
      vacancy: id_vacancy,
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
      {page === "/favorites" && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выберите вакансию *</InputLabel>
          <Select
            name="vacancy"
            required
            className={s.input}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => set_id_vacancy(e.target.value)}
            label="Филиал">
            {vacancyEmployer?.map((item, index) => (
              <MenuItem className={s.item} key={item?.id} value={item?.id}>
                <div className={s.box_span}>
                  <span>{item?.position}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
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
