import { useEffect } from "react";
import s from "./Position.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { deletePositionEmployee, getMyBranch, getPositionEmployee, sendPositionEmployee } from "../../../../store/slices/companyDetailsSlice";
import { useState } from "react";
import { FormControl, TextField } from "@mui/material";

const Position = () => {
    const { position, isLoading } = useSelector((state) => state.companyDetails);
    const [id_branch, setId_branch] = useState(null);
    const [component, setComponent] = useState(false);
    const dispatch = useDispatch();
    const remove = async (id) => {
        try {
            const response = await dispatch(deletePositionEmployee(id))
            response && handlerPosition()
        }
        catch (error) {
            console.log(error);
        }

    };
    const handlerPosition = () => {
        dispatch(getPositionEmployee());

    }
    useEffect(() => {
        handlerPosition()
    }, []);
    const [value, setValue] = useState('')
    const onSubmit = async () => {
        const response = await dispatch(sendPositionEmployee({ name: value }))
        response && handlerPosition()
    }
    const filledBranch = [...position, ...new Array(Math.max(9 - (position?.length || 0), 0)).fill(null)];

    return (
        <div className={s.container}>
            <div className={s.box}>
                <FormControl fullWidth>
                    <TextField
                        id="outlined-basic"
                        name='employee_count'
                        label="Введите название позиции"
                        variant="outlined"
                        onChange={(e) => setValue(e.target.value)}
                    />

                </FormControl>
                <button onClick={onSubmit}>Добавить</button>
                <button>Стереть</button></div>
            <ul className={s.ul}>
                <li>
                    <span>номер</span>
                    <span>Название</span>
                </li>
                {filledBranch.map((e, index) => (
                    <li key={index}>
                        {e ? (
                            <>
                                <span>{index + 1}</span>
                                <span>{e?.name}</span>
                                <button className={s.btn} onClick={() => remove(e?.id)}>
                                    Удалить
                                </button>
                            </>
                        ) : (
                            <>
                                <span>&nbsp;</span>
                                <span>&nbsp;</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Position;
