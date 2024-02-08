import { useEffect } from "react";
import styles from "./cards.module.sass";
import { MdOutlineWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVacancyEmployer } from "../../../../store/slices/vacancySlice";

const Cards = () => {
  const dispatch = useDispatch();
  const { vacancyEmployer } = useSelector((state) => state.vacancy);

  console.log(vacancyEmployer);

  useEffect(() => {
    dispatch(getVacancyEmployer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.cards}>
      {vacancyEmployer?.map((elem) => (
        // eslint-disable-next-line react/jsx-key
        <div className={styles.card} key={elem?.id}>
          <div className={styles.vacancies_name}>
            <MdOutlineWorkOutline className={styles.vacancies_icon} />
            <div>
              <h3 className={styles.name}>{elem?.position}</h3>
              <h5 className={styles.name_company}>{elem?.branch}</h5>
            </div>
          </div>
          <div className={styles.card_descriptions}>
            <h3 className={styles.time_graphic}>График работы:</h3>
            <p className={styles.graphic_day}>{elem?.time_start}</p>
            <p className={styles.graphic_day}>{elem?.time_end}</p>
          </div>
          <div className={styles.stage_work}>
            <h3 className={styles.stage_tite}>Стаж работы: </h3>
            <h5 className={styles.stage_desc}>{elem?.experience}</h5>
          </div>
          <div className={styles.views}>
            <h3>Просмотров: </h3>
            <h5 className={styles.views_desc}>{elem?.views_vacancy}</h5>
          </div>
          <div className={styles.card_button}>
            <Link to={"/card-detail-vacancies/" + elem?.id} className={styles.btn_link}>
              Подробнее
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
