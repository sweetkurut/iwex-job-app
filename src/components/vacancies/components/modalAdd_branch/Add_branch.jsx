import React, { useEffect, useState } from "react";
import s from "./Add_branch.module.sass";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
    getMyBranch,
    sendAddBranch,
} from "../../../../store/slices/companyDetailsSlice";
import ModalWarning from "../../../modalWarning/ModalWarning";


const ModalAddBranch = ({ changeStateBranch, addBranch }) => {
    const [modalMessage, setModalMessage] = useState({ title: "", text: "" });
    const land_list = [
        'Baden-Württemberg',
        'Bavaria',
        'Berlin',
        'Brandenburg',
        'Bremen',
        'Hamburg',
        'Hesse',
        'Lower Saxony',
        'Mecklenburg-Vorpommern',
        'North Rhine-Westphalia',
        'Rhineland-Palatinate',
        'Saarland',
        'Saxony',
        'Saxony-Anhalt',
        'Schleswig-Holstein',
        'Thuringia',
    ];

    const [data, setData] = useState({
        address: "",
        land_name: "",
        company: "",
        description: "",
        id: "",
        link_address: "",
        name: "",
        city: "",
    });
    const dispatch = useDispatch();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const onSubmit = async (e) => {
        e?.preventDefault();
        try {
            const response = await dispatch(sendAddBranch(data)).unwrap()
            console.log(response);
            if (response) {
                dispatch(getMyBranch());
                setModalMessage({ title: "Успех", text: "Филиал успешно сохранен" });
                changeStateBranch()
            }
        } catch (error) {
            console.log(error);
            setModalMessage({ title: "Ошибка", text: error });

        }
    };
    return (
        <>
            <ModalWarning
                modalMessage={modalMessage} />
            <React.Fragment>
                <Dialog
                    maxWidth={'800'}
                    open={addBranch}
                    onClose={changeStateBranch}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Добавление Филиала</DialogTitle>
                    <form style={{ width: 900 }} onSubmit={(e) => onSubmit(e)} >
                        <DialogContent className={s.box_housing}>
                            <div className={s.wrapper}>
                                <div className={s.box}>
                                    <TextField
                                        value={data?.name || ""}
                                        name="name"
                                        required
                                        className={s.input}
                                        id="outlined-basic"
                                        label="Название филиала"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Земля</InputLabel>
                                        <Select
                                            name="land_name"
                                            required
                                            className={s.input}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Земля"
                                            value={data?.land_name}
                                            onChange={handleInputChange}>
                                            {land_list?.map((item, index) => (
                                                <MenuItem key={index} value={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        value={data?.city || ""}
                                        name="city"
                                        required
                                        className={s.input}
                                        id="outlined-basic"
                                        label="Город"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        value={data?.address || ""}
                                        name="address"
                                        required
                                        className={s.input}
                                        id="outlined-basic"
                                        label="Адрес"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        value={data?.link_address || ""}
                                        name="link_address"
                                        className={s.input}
                                        id="outlined-basic"
                                        label="Ссылка на адрес"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <TextField
                                    value={data?.description || ""}
                                    name="description"
                                    className={s.textarea}
                                    id="outlined-multiline-static"
                                    label="Описание"
                                    multiline
                                    rows={11}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button autoFocus>Сохранить</button>
                            <button onClick={changeStateBranch} autoFocus>
                                Отмена
                            </button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </>
    );
};

export default ModalAddBranch