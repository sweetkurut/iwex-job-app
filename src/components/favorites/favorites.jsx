import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { IoHeartSharp } from "react-icons/io5";
import { DeleteFavorite, getFavorite } from "../../store/slices/employeeDetailsSlice";
import styles from "./favorite.module.sass";
import ModalCalendar from "../calendar/Calendar";
import VacancyList from "./vacancy/vacancylist";
import ModalWarning from "../modalWarning/ModalWarning";

const Favorites = () => {
  const { favorite } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);


  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  useEffect(() => {
    setShowButton(Object.values(selected).some((value) => value));
  }, [selected]);
  const handleSelectAll = (event) => {
    setSelected(
      favorite.reduce((acc, elem) => {
        acc[elem.user_profile.id] = event.target.checked;
        return acc;
      }, {})
    );
  };


  const handleSelectOne = (event, id) => {
    setSelected((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };


  const isSelected = (id) => !!selected[id];


  const handleButtonClick = () => {
    setShowCalendar(true);
    setOpen(true);
  };


  const handleDeleteFavorite = async (id) => {
    try {
      const response = await dispatch(DeleteFavorite(id));
      if (response) {
        const message = {
          title: 'Успех',
          text: 'Успешно удаленно',
        }
        setModalMessage(message)
        dispatch(getFavorite());
      }
    } catch (error) {
      setModalMessage(error)
    }
  }



  return (
    <>
      <ModalWarning modalMessage={modalMessage} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h2 className={styles.title}>Избранные</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      indeterminate={
                        Object.values(selected).some((value) => value) &&
                        !Object.values(selected).every((value) => value)
                      }
                      checked={Object.values(selected).every((value) => value)}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Фото</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Гражданство</TableCell>
                  <TableCell>Пол</TableCell>
                  <TableCell>Знание немецкого языка</TableCell>
                  <TableCell>Знание английского языка</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Избранное</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {favorite && favorite.length > 0 ? (
                  favorite.map((elem, index) => (
                    <TableRow
                      hover
                      onClick={(event) => handleSelectOne(event, elem.user_profile.id)}
                      role="checkbox"
                      aria-checked={isSelected(elem.user_profile.id)}
                      key={elem.id}
                      selected={isSelected(elem.user_profile.id)}
                    >
                      <TableCell>
                        <Checkbox checked={isSelected(elem.user_profile.id)} />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar
                          src={elem?.user_profile.profile_photo}
                          alt="user_photo"
                          sx={{
                            width: 50,
                            height: 50,
                          }}
                        />
                      </TableCell>
                      <TableCell>{elem?.user_profile.first_name}</TableCell>
                      <TableCell>{elem?.user_profile.nationality_en}</TableCell>
                      <TableCell>{elem?.user_profile.gender_en}</TableCell>
                      <TableCell>{elem?.user_profile.german}</TableCell>
                      <TableCell>{elem?.user_profile.english}</TableCell>
                      <TableCell>{elem?.created_date}</TableCell>
                      <TableCell>
                        <button className={styles.delete_button} onClick={() => handleDeleteFavorite(elem?.id)}>Удалить</button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <div className={styles.student_search}>
                        <div className={styles.student_img}>
                          <img
                            alt="img-student"
                            src="/izbrannoe.svg"
                            style={{
                              width: "500px",
                            }}
                          />
                        </div>
                        <p className={styles.student_search_title}>
                          Кажется вы ещё не выбрали студента
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {showButton && (
            <div className={styles.btns}>
              <button className={styles.btn} onClick={handleButtonClick}>
                Пригласить
              </button>
            </div>
          )}
          {showCalendar &&
            Object.keys(selected)
              .filter((id) => selected[id])
              .map((id) => (
                <ModalCalendar
                  key={id}
                  open={open}
                  modalOpen={open}
                  setOpen={setOpen}
                  page={"/favorites"}
                  selected={selected}
                />
              ))}
        </div>
        {/* {open || <VacancyList openSelectVcancy={openSelectVcancy} open={open} />} */}
      </div>
    </>

  );
};

export default Favorites;
