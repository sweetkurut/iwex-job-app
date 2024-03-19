import { Avatar } from "@mui/material";
import styles from "./students.module.sass";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProfilesStaffList } from "../../store/slices/employeeDetailsSlice";
import { SceletonCardVacancy } from "../SceletonLoading/SceletonLoading";

const ListStudents = () => {
  const dispatch = useDispatch();
  const { staff } = useSelector((state) => state.employeeDetails);
  const { isLoading } = useSelector((state) => state.vacancy);

  console.log(staff);

  useEffect(() => {
    dispatch(getAllProfilesStaffList());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isLoading ? (
          <SceletonCardVacancy />
        ) : (
          <>
            <h2 className={styles.title}>Список Студентов</h2>
            <div className={styles.cards}>
              {Array.isArray(staff) &&
                staff.map((item) => (
                  <div className={styles.card} key={item.id}>
                    <div className={styles.vacancies_name_image}>
                      <div className={styles.profile_image}>
                        <Avatar
                          alt="Remy Sharp"
                          src={item?.profile_photo}
                          sx={{ width: 85, height: 85 }}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.last_first_name}>
                        <h3 className={styles.name}>{item?.first_name}</h3>
                        <h5 className={styles.name_company}>{item?.last_name} </h5>
                      </div>
                    </div>
                    <div className={styles.card_descriptions}>
                      <h3 className={styles.user_data}>Личные данные:</h3>
                      <div className={styles.number}>
                        <span className={styles.phone_num}>Номер телефона: {item?.phone}</span>
                      </div>
                      <p className={styles.birth_day}>День рождение: {item?.date_of_birth}</p>
                      <p className={styles.graphic_day}>Пол: {item?.gender_ru}</p>
                    </div>
                    <div className={styles.card_button}>
                      <Link to={"/list-students-byID/" + item?.id} className={styles.btn_link}>
                        Подробнее
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListStudents;
