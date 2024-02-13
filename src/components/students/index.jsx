import { useDispatch, useSelector } from "react-redux";
import styles from "./students.module.sass";
import { useEffect, useRef, useState } from "react";
import { getAllEmployee, getEmployeeFilter } from "../../store/slices/employeeDetailsSlice";
import Loaders from "../../UI/loaders";
import { Link } from "react-router-dom";
import { Avatar, Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useLocation } from "react-router-dom";

const Students = () => {
  const dispatch = useDispatch();
  let { state } = useLocation();
  const { employee, isLoading } = useSelector((state) => state.employeeDetails);
  const [value, setValue] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value) {
      dispatch(getEmployeeFilter(state?.id_vacancy));
    } else {
      dispatch(getAllEmployee());
    }
  }, [value, state]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Студенты</h2>
        <Box sx={{ width: "100%", typography: "body1" }} className={styles.box_container}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Item One" value={true} />
                <Tab label="Item Two" value={false} />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <div className={styles.cards}>
          {isLoading ? (
            <Loaders />
          ) : employee && employee.length > 0 ? (
            employee.map((elem) => (
              <div className={styles.card} key={elem?.id}>
                <div className={styles.vacancies_name_image}>
                  <div className={styles.profile_image}>
                    <Avatar
                      alt="Remy Sharp"
                      src={elem?.profile_photo}
                      sx={{ width: 85, height: 85 }}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.last_first_name}>
                    <h3 className={styles.name}>{elem?.first_name}</h3>
                    <h5 className={styles.name_company}>{elem?.last_name}</h5>
                  </div>
                </div>
                <div className={styles.card_descriptions}>
                  <h3 className={styles.user_data}>Личные данные:</h3>
                  <p className={styles.number}>
                    <span>Номер телефона: {elem?.phone}</span>
                  </p>
                  <p className={styles.birth_day}>День рождение:{elem?.date_of_birth}</p>
                  <p className={styles.graphic_day}>Пол:{elem?.gender_en}</p>
                </div>
                <div className={styles.card_button}>
                  <Link
                    to={"/student-detail/" + elem.id}
                    state={{ id_vacancy: state.id_vacancy }}
                    className={styles.btn_link}>
                    Подробнее
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h2>Ошибка: нет данных о сотрудниках</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
