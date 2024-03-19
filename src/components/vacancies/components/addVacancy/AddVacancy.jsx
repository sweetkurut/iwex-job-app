import React, { useEffect, useState } from "react";
import s from './AddVacancy.module.sass';
import {
    Breadcrumbs,
    Checkbox,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
    getHousing,
    getMyBranch,
    sendHousinng,
} from "../../../../store/slices/companyDetailsSlice";
import { send_create_vacancy } from "../../../../store/slices/vacancySlice";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AddVacancy = () => {
    const navigate = useNavigate();
    const { housing, branch, isLoading } = useSelector((state) => state.companyDetails);
    const { isLoading: vacancyLoading } = useSelector((state) => state.vacancy);
    const [open, setOpen] = useState(false);

    const [data, setData] = useState({
        housing_status: false,
        start_holidays_date: null,
        end_holidays_date: null,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyBranch());
        dispatch(getHousing());
    }, []);

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: name === "housing_status" ? checked : value,
        }));
    };

    const getTime = (e, name) => {
        // if (e === null) {
        //     const defaultTime = name === "time_start" ? "09:00" : "18:00";
        //     setData((prevData) => ({
        //         ...prevData,
        //         [name]: defaultTime,
        //     }));
        // } else {
        //     const hours = e.hour().toString().padStart(2, "0");
        //     const minutes = e.minute().toString().padStart(2, "0");
        //     const timeString = `${hours}:${minutes}`;
        //     setData((prevData) => ({
        //         ...prevData,
        //         [name]: timeString,
        //     }));
        // }
        const hours = e?.hour().toString().padStart(2, "0");
        const minutes = e?.minute().toString().padStart(2, "0");
        const timeString = `${hours}:${minutes}`;
        setData((prevData) => ({
            ...prevData,
            [name]: timeString,
        }));
    };
    console.log(data);


    const [modalMessage, setModalMessage] = useState({ title: "", text: "" });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(send_create_vacancy(data)).unwrap();
            console.log("response", response);
            if (response) {
                setModalMessage({ title: "Успех", text: "Вакансия успешно добавлена", vacancy: true });
                setOpen(true);
            }
        } catch (error) {
            console.error("error", error);
            setModalMessage({ title: "Ошибка", text: "При добавлении вакансии произошла ошибка" });
            setOpen(true);
        }
    };

    const handleClose = () => {
        modalMessage.vacancy && navigate("/vacancies");
        setOpen(false);
    };
    const level_language = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const gender = [
        { gender: "Мужской", value: "Male" },
        { gender: "Женский", value: "Female" },
        { gender: "Неважно", value: "Any" },
    ];

    //Жилье
    const [addHousing, setAddHousing] = useState(false);
    const [dataHousing, setDataHousing] = useState({
        files: [],
    });
    const changeStateHousing = (e) => {
        e.preventDefault();
        setAddHousing(!addHousing);
    };
    const handleInputChangeHousing = (e) => {
        const { name, value } = e.target;
        setDataHousing((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlerSendHousing = async (formData) => {
        try {
            const response = await dispatch(sendHousinng(formData)).unwrap();
            setAddHousing(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        const updatedFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                updatedFiles.push({
                    file: file,
                    preview: e.target.result,
                });
                if (updatedFiles.length === files.length) {
                    setDataHousing((prevState) => ({
                        ...prevState,
                        files: [...prevState.files, ...updatedFiles],
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmitHousing = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in dataHousing) {
            if (key === "files") {
                dataHousing.files.forEach((file, index) => {
                    formData.append("files", file);
                });
            } else {
                formData.append(key, dataHousing[key]);
            }
        }

        handlerSendHousing(formData);
    };

    const ModalConfirm = () => {
        return (
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{modalMessage.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{modalMessage.text}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    };

    const ModalAddHousing = () => {
        return (
            <React.Fragment>
                <Dialog
                    open={addHousing}
                    onClose={changeStateHousing}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Добавление жилья</DialogTitle>
                    <form onSubmit={onSubmitHousing}>
                        <DialogContent className={s.box_housing}>
                            <TextField
                                value={data.housing_type}
                                className={s.input}
                                id="outlined-basic"
                                name="housing_type"
                                required
                                label="Тип жилья"
                                variant="outlined"
                                onChange={handleInputChangeHousing}
                            />
                            <TextField
                                value={data.housing_cost}
                                className={s.input}
                                id="outlined-basic"
                                name="housing_cost"
                                type="number"
                                required
                                label="Стоимость жилья"
                                variant="outlined"
                                onChange={handleInputChangeHousing}
                            />
                            <TextField
                                value={data.additional_expenses}
                                className={s.input}
                                id="outlined-basic"
                                name="additional_expenses"
                                label="Дополнительные расходы"
                                required
                                variant="outlined"
                                onChange={handleInputChangeHousing}
                            />
                            <TextField
                                value={data.deposit}
                                className={s.input}
                                id="outlined-basic"
                                name="deposit"
                                type="number"
                                required
                                label="Залог"
                                variant="outlined"
                                onChange={handleInputChangeHousing}
                            />
                            <TextField
                                value={data.cleaning}
                                className={s.input}
                                id="outlined-basic"
                                name="cleaning"
                                label="Уборка"
                                required
                                variant="outlined"
                                onChange={handleInputChangeHousing}
                            />
                            <InputLabel id="demo-simple-select-label">Выберите фото-видео *</InputLabel>
                            <input type="file" onChange={handleFileChange} multiple />
                            <div className={s.wrapper_img}>
                                {dataHousing.files?.map((file, index) => (
                                    <div className={s.box_img} key={index}>
                                        {file.preview && <img src={file.preview} alt={file.name} />}
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button autoFocus>Сохранить</button>
                            <button onClick={changeStateHousing} autoFocus>
                                Отмена
                            </button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        );
    };
    return (
        <>
            {isLoading ||
                (vacancyLoading && (
                    <Box className={s.loading} sx={{ display: "flex" }}>
                        <CircularProgress />
                    </Box>
                ))}
            {open && ModalConfirm()}
            {addHousing && ModalAddHousing()}
            <div className={s.container}>
                <div style={{ marginBottom: 50 }}>
                    <Breadcrumbs aria-label="breadcrumb" className={s.breadcrumbs}>
                        <Link color="inherit" to="/" className={s.link_to_home}>
                            <GoHome />
                        </Link>
                        <Link to="/vacancies">Мои вакансии</Link>
                        <Typography color="text.primary" className={s.typography}>
                            Добавление вакансии
                        </Typography>
                    </Breadcrumbs>
                </div>
                <form
                    style={{ opacity: isLoading || vacancyLoading ? 0.5 : 1 }}
                    onSubmit={(e) => onSubmit(e)}>
                    <div className={s.wrapper}>
                        <div className={s.box}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Филиал *</InputLabel>
                                <Select
                                    name="branch"
                                    required
                                    className={s.input}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Филиал"
                                    value={data.branch || ""}
                                    onChange={handleInputChange}>
                                    {branch?.map((item, index) => (
                                        <MenuItem
                                            className={s.item}
                                            style={{ alignItems: "flex-start" }}
                                            key={index}
                                            value={item?.id}>
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
                            <TextField
                                className={s.input}
                                id="outlined-basic"
                                name="position"
                                required
                                value={data.position || ""}
                                label="Позиции"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                className={s.input}
                                id="outlined-basic"
                                name="employee_count"
                                required
                                type="number"
                                value={data.employee_count || ""}
                                label="Количество работников"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Пол *</InputLabel>
                                <Select
                                    name="gender"
                                    required
                                    className={s.input}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Пол"
                                    value={data.gender || ""}
                                    onChange={handleInputChange}>
                                    {gender?.map((item, index) => (
                                        <MenuItem
                                            className={s.item}
                                            style={{ alignItems: "flex-start" }}
                                            key={index}
                                            value={item?.value}>
                                            <div className={s.box_span}>
                                                <span>Пол: </span>
                                                <span>{item?.gender}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    ampm={false}
                                    className={s.input}
                                    onChange={(time) => getTime(time, "time_start")}
                                    label="Время начала работы:"
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                                <TimePicker
                                    ampm={false}
                                    className={s.input}
                                    label="Время окончания работы:"
                                    onChange={(time) => getTime(time, "time_end")}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                                <DatePicker
                                    className={s.input}
                                    name="start_holidays_date"
                                    value={data.start_holidays_date}
                                    label="Дата начала каникул:"
                                    onChange={(date) => {
                                        const formattedDate = date?.format("YYYY-MM-DD");
                                        setData((prevData) => ({
                                            ...prevData,
                                            start_holidays_date: formattedDate,
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                                <DatePicker
                                    className={s.input}
                                    name="end_holidays_date"
                                    value={data.end_holidays_date}
                                    label="Дата окончания каникул:"
                                    onChange={(date) => {
                                        const formattedDate = date?.format("YYYY-MM-DD");
                                        setData((prevData) => ({
                                            ...prevData,
                                            end_holidays_date: formattedDate,
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} required />}
                                />
                            </LocalizationProvider>

                            <TextField
                                className={s.input}
                                id="outlined-basic"
                                name="vehicle"
                                value={data.vehicle || ""}
                                label="Транспорт"
                                required
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Опыт работы</InputLabel>
                                <Select
                                    required
                                    name="experience"
                                    className={s.input}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Опыт работы"
                                    value={data.experience || ""}
                                    onChange={handleInputChange}>
                                    {["Без опыта работы", "От 1 года", "От 2х лет", "От 3х лет"]?.map(
                                        (item, index) => (
                                            <MenuItem key={index} value={item}>
                                                <div className={s.box_span}>{item}</div>
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                            <TextField
                                className={s.input}
                                id="outlined-basic"
                                name="insurance"
                                required
                                value={data.insurance || ""}
                                label="Страховка"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                value={data.salary || ""}
                                className={s.input}
                                required
                                id="outlined-basic"
                                name="salary"
                                type="number"
                                label="Зарплата"
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                <Checkbox
                                    name="housing_status"
                                    checked={data?.housing_status}
                                    onChange={handleInputChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <p className={s.text}>Предоставляется ли жилье</p>
                            </div>

                            {data?.housing_status && (
                                <>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Жилье </InputLabel>
                                        <Select
                                            name="housing"
                                            required
                                            className={s.input}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Жильё"
                                            value={data?.housing || ""}
                                            onChange={handleInputChange}>
                                            {housing?.map((item, index) => (
                                                <MenuItem
                                                    className={s.item}
                                                    style={{ alignItems: "flex-start" }}
                                                    key={index}
                                                    value={item?.id}>
                                                    <div className={s.box_span}>
                                                        <span>Тип жилья: </span>
                                                        <span>{item?.housing_type}</span>
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <button onClick={changeStateHousing} className={s.add}>
                                        Добавить жилье
                                    </button>
                                </>
                            )}
                            <p className={s.text}>Соискатель должен знать:</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Английский</InputLabel>
                                <Select
                                    name="language_english"
                                    required
                                    className={s.input}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Английский"
                                    value={data.language_english || ""}
                                    onChange={handleInputChange}>
                                    {level_language?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            <div className={s.box_span}>{item}</div>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Немецкий</InputLabel>
                                <Select
                                    name="language_german"
                                    required
                                    className={s.input}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Английский"
                                    value={data.language_german || ""}
                                    onChange={handleInputChange}>
                                    {level_language?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            <div className={s.box_span}>{item}</div>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={s.box_right_input}>
                            <TextField
                                value={data?.description || ""}
                                name="description"
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
                                value={data?.duty || ""}
                                name="duty"
                                className={s.textarea}
                                id="outlined-multiline-static"
                                label="Обязанности"
                                required
                                multiline
                                rows={6}
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                value={data?.requirements || ""}
                                name="requirements"
                                className={s.textarea}
                                id="outlined-multiline-static"
                                label="Требования работы"
                                multiline
                                rows={6}
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                value={data?.conditions || ""}
                                name="conditions"
                                className={s.textarea}
                                id="outlined-multiline-static"
                                label="Условия работы"
                                multiline
                                rows={6}
                                variant="outlined"
                                onChange={handleInputChange}
                            />
                            <TextField
                                value={data?.clothingform || ""}
                                name="clothingform"
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
                        <Link className={s.btn} to="/">
                            Отмена
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddVacancy;
