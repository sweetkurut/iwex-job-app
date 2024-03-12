import { useEffect, useState } from "react";
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
import { getFavorite } from "../../store/slices/employeeDetailsSlice";
import styles from "./favorite.module.sass";

const Favorites = () => {
  const { favorite } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  useEffect(() => {
    setShowButton(selected.length > 0);
  }, [selected]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = favorite.map((elem) => elem.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (event, id) => {
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

  const handleButtonClick = () => {
    // Действие при нажатии кнопки
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Избранные</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < favorite.length}
                    checked={selected.length === favorite.length}
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
                favorite.map((elem) => (
                  <TableRow
                    hover
                    onClick={(event) => handleSelectOne(event, elem.id)}
                    role="checkbox"
                    aria-checked={isSelected(elem.id)}
                    tabIndex={-1}
                    key={elem.id}
                    selected={isSelected(elem.id)}>
                    <TableCell>
                      <Checkbox checked={isSelected(elem.id)} />
                    </TableCell>
                    <TableCell>{elem.id}</TableCell>
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
                      <IoHeartSharp className={styles.heart} />
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
          <button className={styles.btn} onClick={handleButtonClick}>
            Пригласить
          </button>
        )}
      </div>
    </div>
  );
};

export default Favorites;
