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
import ModalWarning from "../modalWarning/ModalWarning";

const ModalCalendar = ({ open, setOpen, page, selected }) => {
  const { vacancyEmployer } = useSelector((state) => state.vacancy);
  const [value, onChange] = useState(new Date());
  const [valueClock, setValueClock] = useState(null);
  const [modalMessage, setModalMessage] = useState(false);
  const { id } = useParams();
  let { state } = useLocation();
  const dispatch = useDispatch();
  const [id_vacancy, set_id_vacancy] = useState(state?.id_vacancy || '');


  const handleInputChange = (e) => {
    const { value } = e.target;
    setValueClock(value)
  };


  useEffect(() => {
    dispatch(getVacancyEmployer());
  }, [dispatch]);



  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async () => {
    if (!id_vacancy) {
      console.error("Ошибка: объект state или свойство id_vacancy отсутствует.");
      return;
    }

    const date = `${value.toISOString().split('T')[0]} ${valueClock}`;

    const data = {
      user: id ? [id] : selected,
      vacancy: id_vacancy,
      interviews_date: dateTime,
    };
    console.log(data);
    try {
      const response = await dispatch(sendInterviews(data)).unwrap();
      console.log(response);
      handleClose(true);
      const message = {
        title: 'Успех',
        text: 'Приглашение на собеседования ',
      }
      setModalMessage(message)
    } catch (error) {
      setOpen(true);
      setModalMessage({ title: 'Ошибка', text: error?.non_field_errors[0] })
      console.error(error);
    }
  };


  return (
    <>
      <ModalWarning modalMessage={modalMessage} />

      <Dialog
        style={{ height: 800 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
        {page === "/favorites" && (
          <FormControl style={{ margin: 20 }}>
            <InputLabel id="demo-simple-select-label">Выберите вакансию *</InputLabel>
            <Select
              name="vacancy"
              required
              className={s.input}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => set_id_vacancy(e.target.value)}
              value={id_vacancy}
              label="Выберите вакансию "
            >
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

            <TextField
              required
              className={s.input}
              onChange={handleInputChange}
              label="Время начала работы:"
              InputLabelProps={{
                shrink: true,
              }}
              type="time"
              name="time_start"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Отправить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalCalendar;
