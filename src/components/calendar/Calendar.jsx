import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  makeStyles,
} from "@mui/material";
import Calendar from "react-calendar";
import Clock from "react-clock";
import "react-calendar/dist/Calendar.css";
import s from "./Calendar.module.sass";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalCalendar = ({ open, setOpen }) => {
  const [value, onChange] = useState(new Date());
  const [valueClock, setValueClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValueClock(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title">
      <DialogTitle>{"Выберите дату и время?"}</DialogTitle>
      <DialogContent>
        <Calendar onChange={onChange} value={value} />
        <p>Current time:</p>
        <Clock value={value} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleClose}>Отправить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCalendar;
