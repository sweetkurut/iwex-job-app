import { useDispatch, useSelector } from "react-redux";
import styles from "./students.module.sass";
import { useEffect, useRef, useState } from "react";
import { getAllEmployee, getEmployeeFilter } from "../../store/slices/employeeDetailsSlice";
import { GrLanguage } from "react-icons/gr";
import { CgCalendarToday } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Avatar, Box, Tab } from "@mui/material";
import { MdOutlinePhone } from "react-icons/md";
import { TabContext, TabList } from "@mui/lab";
import { useLocation } from "react-router-dom";
import { FaGenderless } from "react-icons/fa";
import { SceletonCardStudents } from "../SceletonLoading/SceletonLoading";

const Students = () => {
  const dispatch = useDispatch();
  let { state } = useLocation();
  const { employee, isLoading } = useSelector((state) => state.employeeDetails);
  const [value, setValue] = useState(() => {
    const savedValue = sessionStorage.getItem('myTabValue');
    return savedValue !== null ? Number(savedValue) : 0;
  });


  useEffect(() => {
    sessionStorage.setItem('myTabValue', value.toString());
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(Number(newValue));
  };

  useEffect(() => {
    value === 0 ? dispatch(getEmployeeFilter(state?.id_vacancy)) : dispatch(getAllEmployee());
  }, [value, state, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Студенты</h2>
        <Box sx={{ width: "100%", typography: "body1" }} className={styles.box_container}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Фильтрация" value={0} />
                <Tab label="Все студенты" value={1} />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <div className={styles.cards}>
          {isLoading ? (
            <SceletonCardStudents />
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
                  <div className={styles.number}>
                    <MdOutlinePhone className={styles.icon_phone} />
                    <span className={styles.phone_num}>Номер телефона: {elem?.phone}</span>
                  </div>
                  <p className={styles.birth_day}>
                    <CgCalendarToday />
                    День рождение:{elem?.date_of_birth}
                  </p>
                  <p className={styles.birth_day}>
                    <GrLanguage />
                    Знание немецкого языка:{elem?.german}
                  </p>
                  <p className={styles.birth_day}>
                    <GrLanguage />
                    Знание английского языка:{elem?.english}
                  </p>
                  <p className={styles.graphic_day}>
                    <FaGenderless />
                    Пол:{elem?.gender_en}
                  </p>
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
            <div className={styles.student_search}>
              <div className={styles.student_img}>
                <img
                  alt="img-student"
                  src="/img/student.svg"
                  style={{
                    width: "500px",
                  }}
                />
              </div>
              <p className={styles.student_search_title}>
                Кажется на вашу вакансию не нашлось студентов
              </p>
              <button
                className={styles.btn_allStudents}
                onClick={(e) => {
                  handleChange(e, false);
                }}>
                Все студенты
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
