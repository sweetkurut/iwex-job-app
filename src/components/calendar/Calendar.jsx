import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, makeStyles } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import s from './Calendar.module.sass'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModalCalendar = ({ user, vacancy, open, setOpen }) => {
    const [value, onChange] = useState(new Date());
    const [valueClock, setValueClock] = useState(new Date());

    const getTime = (e, name) => {

        const hours = e.hour().toString().padStart(2, "0");
        const minutes = e.minute().toString().padStart(2, "0");
        const timeString = `${hours}:${minutes}`;
        setValueClock((prevData) => ({
            ...prevData,
            [name]: timeString,
        }));
    };
    console.log(valueClock);
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
        // setOpen(false);
        c
    };



    return (
        <Dialog
            style={{ height: 800 }}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{"Выберите дату и время"}</DialogTitle>
            <DialogContent >
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
                        label="Время собседования:"
                        ampm={false}
                        onChange={(time) => getTime(time, "time")}

                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleClose}>Отправить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCalendar;
