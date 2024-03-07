import { Avatar } from "@mui/material";
import styles from "./employer.module.sass";
import { Link } from "react-router-dom";

const EmployerComponent = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Список Работодателей</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.vacancies_name_image}>
              <div className={styles.profile_image}>
                <Avatar
                  alt="Remy Sharp"
                  // src={elem?.profile_photo}
                  sx={{ width: 85, height: 85 }}
                  loading="lazy"
                />
              </div>
              <div className={styles.last_first_name}>
                <h3 className={styles.name}>Ermek</h3>
                <h5 className={styles.name_company}> Ermek </h5>
              </div>
            </div>
            <div className={styles.card_descriptions}>
              <h3 className={styles.user_data}>Личные данные:</h3>
              <div className={styles.number}>
                <span className={styles.phone_num}>Номер телефона: 23234234234</span>
              </div>
              <p className={styles.birth_day}>День рождение:12.02.06</p>
              <p className={styles.birth_day}>Знание немецкого языка:c1</p>
              <p className={styles.birth_day}>Знание английского языка:c1</p>
              <p className={styles.graphic_day}>Пол: M</p>
            </div>
            <div className={styles.card_button}>
              <Link to={"#"} className={styles.btn_link}>
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerComponent;
