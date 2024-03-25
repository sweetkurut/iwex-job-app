import styles from "./students.module.sass";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEmployee, getAllProfilesStaffList } from "../../store/slices/employeeDetailsSlice";
import { SceletonCardVacancy } from "../SceletonLoading/SceletonLoading";

import { GrLanguage } from "react-icons/gr";
import { CgCalendarToday } from "react-icons/cg";
import { Avatar, Box, Tab } from "@mui/material";
import { MdOutlinePhone } from "react-icons/md";
import { TabContext, TabList } from "@mui/lab";
import { FaGenderless } from "react-icons/fa";
import { SceletonCardStudents } from "../SceletonLoading/SceletonLoading";


const ListStudents = () => {
  const dispatch = useDispatch();
  const { employee, isLoading } = useSelector((state) => state.employeeDetails);


  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <h2 className={styles.title}>Студенты</h2>
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
                          to={"/list-students-byID/" + elem?.id}
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
                      Не найдено ни одного студента.
                    </p>
                    <button
                      className={styles.btn_allStudents}
                      onClick={(e) => {
                        handleChange(e, false);
                      }}>
                      Добавить студента
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ListStudents;
