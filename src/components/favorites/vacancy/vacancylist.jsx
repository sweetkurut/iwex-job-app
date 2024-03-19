import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.sass";
import React, { useEffect, useState } from "react";
import { getVacancyEmployer } from "../../../store/slices/vacancySlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox"; // Changed import

// eslint-disable-next-line react/prop-types
const VacancyList = ({ openSelectVcancy, open }) => {
  const { vacancyEmployer } = useSelector((state) => state.vacancy);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  console.log(vacancyEmployer);

  const handleToggle = (id) => () => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleOk = () => {
    // Тут можно отправить выбранные вакансии на сервер
    console.log("Selected vacancies:", selected);
    openSelectVcancy(); // Закрыть диалоговое окно после отправки
  };

  useEffect(() => {
    dispatch(getVacancyEmployer());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={openSelectVcancy}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: "20px",
            textAlign: "center",
          }}>
          Выберите вакансию
        </DialogTitle>
        <DialogContent sx={{ minHeight: "100%", overflowY: "scroll" }} className={styles.container}>
          {vacancyEmployer?.map((e) => (
            <div key={e?.id} className={styles.card}>
              <Checkbox
                checked={isSelected(e.id)}
                onChange={handleToggle(e.id)}
                inputProps={{ "aria-labelledby": `checkbox-list-label-${e.id}` }}
              />
              <DialogContentText id={`checkbox-list-label-${e.id}`}>{e.position}</DialogContentText>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default VacancyList;
