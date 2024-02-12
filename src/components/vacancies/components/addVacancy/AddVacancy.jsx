import React, { useEffect, useState } from 'react';
import s from './AddVacancy.module.sass';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getMyBranch, getPositionEmployee } from '../../../../store/slices/companyDetailsSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
import { send_create_vacancy } from '../../../../store/slices/vacancySlice';
import { Link } from 'react-router-dom';

const AddVacancy = ({ handlerComponent }) => {
    const { branch, position } = useSelector(state => state.companyDetails);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        increase_choices: false,

    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyBranch());
        dispatch(getPositionEmployee());
    }, []);
    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: name === 'increase_choices' ? checked : value,
        }));
    };

    const getTime = (e, name) => {
        if (e === null) {
            const defaultTime = name === 'time_start' ? '09:00' : '18:00';
            setData(prevData => ({
                ...prevData,
                [name]: defaultTime,
            }));
        } else {
            const hours = e.hour().toString().padStart(2, '0');
            const minutes = e.minute().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            setData(prevData => ({
                ...prevData,
                [name]: timeString,
            }));
        }
    };

    const [modalMessage, setModalMessage] = useState({ title: '', text: '' });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(send_create_vacancy(data));
            console.log('response', response);
            if (response) {
                setModalMessage({ title: 'Успех', text: 'Вакансия успешно добавлена' });
                setOpen(true);
            }
        } catch (error) {
            console.error('error', error);
            setModalMessage({ title: 'Ошибка', text: 'При добавлении вакансии произошла ошибка' });
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const modalConfirm = () => {
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {modalMessage.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {modalMessage.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    };
    const level_language = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    return (
        <>
            {open && modalConfirm()}
            <form onSubmit={(e) => onSubmit(e)} className={s.container}>
                <div className={s.wrapper}>
                    <div className={s.box}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Филиал</InputLabel>
                            <Select
                                name='branch'
                                required
                                className={s.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Филиал"
                                value={data.branch || ''}
                                onChange={handleInputChange}
                            >
                                {branch?.map((item, index) => (
                                    <MenuItem className={s.item} style={{ alignItems: 'flex-start' }} key={index} value={item?.id}>
                                        <div className={s.box_span}>
                                            <span>филиал: </span>
                                            <span>{item?.name}</span>
                                        </div>
                                        <div className={s.box_span}>
                                            <span>город: </span>
                                            <span>{item?.city}</span>

                                        </div>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Позиции</InputLabel>
                            <Select
                                name='position'
                                required
                                className={s.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Позиции"
                                value={data.position || ''}
                                onChange={handleInputChange}
                            >
                                {position?.map((item, index) => (
                                    <MenuItem className={s.item} style={{ alignItems: 'flex-start' }} key={index} value={item?.id}>
                                        <div className={s.box_span}>
                                            <span>пизиция: </span>
                                            <span>{item?.name}</span>
                                        </div>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            className={s.input}
                            id="outlined-basic"
                            name='employee_count'
                            required
                            type="number"
                            value={data.employee_count || ''}
                            label="Количество работников"
                            variant="outlined"
                            onChange={handleInputChange} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                slotProps={{
                                    textField: {
                                        required: true,
                                    },
                                }}
                                name='time_start'
                                className={s.input}
                                label="Начало рабочего дня:"
                                ampm={false}
                                onChange={(time) => getTime(time, 'time_start')} />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                slotProps={{
                                    textField: {
                                        required: true,
                                    },
                                }}
                                name='time_end'
                                className={s.input}
                                label="Конец рабочего дня:"
                                required
                                ampm={false}
                                onChange={(time) => getTime(time, 'time_end')} />
                        </LocalizationProvider>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Опыт работы</InputLabel>
                            <Select
                                required
                                name='experience'
                                className={s.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Опыт работы"
                                value={data.experience || ''}
                                onChange={handleInputChange}
                            >
                                {['Без опыта работы', 'От 1 года', 'От 2х лет', 'От 3х лет']?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <div className={s.box_span}>
                                            {item}
                                        </div>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            value={data.salary || ''}
                            className={s.input}
                            required
                            id="outlined-basic"
                            name='salary'
                            type="number"
                            label="Зарплата"
                            variant="outlined"
                            onChange={handleInputChange} />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Checkbox
                                name='increase_choices'
                                checked={data?.increase_choices}
                                onChange={handleInputChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <p className={s.text}>Вы готовы увеличить зарплату, если сотрудник предложит свою собственную?</p>
                        </div>

                        <p className={s.text}>Соискатель должен знать:</p>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Английский</InputLabel>
                            <Select
                                name='language_english'
                                required
                                className={s.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Английский"
                                value={data.language_english || ''}
                                onChange={handleInputChange}
                            >
                                {level_language?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <div className={s.box_span}>
                                            {item}
                                        </div>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Немецкий</InputLabel>
                            <Select
                                name='language_german'
                                required
                                className={s.input}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Английский"
                                value={data.language_german || ''}
                                onChange={handleInputChange}
                            >
                                {level_language?.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        <div className={s.box_span}>
                                            {item}
                                        </div>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </div>
                    <div className={s.box_right_input}>
                        <TextField
                            value={data?.description || ''}
                            name='description'
                            className={s.textarea}
                            id="outlined-multiline-static"
                            label="Описание"
                            required
                            multiline
                            rows={6}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                        <TextField
                            value={data?.duty || ''}
                            name='duty'
                            className={s.textarea}
                            id="outlined-multiline-static"
                            label="Требование"
                            required
                            multiline
                            rows={6}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                        <TextField
                            value={data?.clothingform || ''}
                            name='clothingform'
                            className={s.textarea}
                            id="outlined-multiline-static"
                            label="Форма одежды"
                            multiline
                            rows={6}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className={s.box_button}>
                    <button className={s.btn}>Сохранить</button>
                    <Link className={s.btn} to='/'>Отмена</Link>
                </div>
            </form>
        </>
    )
}

export default AddVacancy;
