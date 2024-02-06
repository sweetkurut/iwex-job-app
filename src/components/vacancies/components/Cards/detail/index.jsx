import { useEffect } from "react";
import styles from "./detail.module.sass";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyDetail } from "../../../../../store/slices/vacancySlice";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const CardDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { detailVacancy } = useSelector((state) => state.vacancy);
  console.log(detailVacancy);

  useEffect(() => {
    dispatch(getVacancyDetail(id));
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link color="inherit" to="/">
              Главная
            </Link>
            <Link to="/vacancies">Мои вакансии</Link>
            <Typography color="text.primary" className={styles.typography}>
              Подробная информация
            </Typography>
            <Typography color="text.primary" className={styles.typography}>
              {detailVacancy?.employer_company_name}
            </Typography>
          </Breadcrumbs>
          <Avatar
            alt="Remy Sharp"
            src={detailVacancy?.employer_company_icon}
            sx={{ width: 250, height: 250 }}
            className={styles.profile_img}
          />
          <h2 className={styles.name_vacancies}>{detailVacancy?.position}</h2>
          <h4>{detailVacancy?.branch}</h4>
        </div>
        <div className={styles.card}>
          <div className={styles.card_data_titles}>
            <h3 className={styles.card_data}>Зарплата: {detailVacancy?.salary}</h3>

            <h3 className={styles.card_data}>Город: {detailVacancy?.branch_city}</h3>
            <h3 className={styles.card_data}>Филиал: {detailVacancy?.branch_address}</h3>
            <h3 className={styles.card_data}>Дресс-Код: {detailVacancy?.clothingform}</h3>
            <h3 className={styles.card_data}>Начало времени работы: {detailVacancy?.time_start}</h3>
            <h3 className={styles.card_data}>Конец времени работы: {detailVacancy?.time_end}</h3>
          </div>
          <div className={styles.card_data_desc}>
            <h3 className={styles.trebovanya}>
              Требования работадателя:
              <h3 className={styles.card_data}>
                Стаж работы: <span>{detailVacancy?.experience}</span>
              </h3>
              <h3>
                Знание немецкого: <span>{detailVacancy?.language_german}</span>
              </h3>
              <h3>
                Знание английского: <span>{detailVacancy?.language_english}</span>
              </h3>
              <h3>
                Количество мест на вакансию: <span>{detailVacancy?.employee_count}</span>
              </h3>
            </h3>
          </div>
          <div className={styles.responsibilities}>
            <h3 className={styles.responsibilities_title}>
              Обязанности:
              <li>
                <span className={styles.responsibilities_desc}>{detailVacancy?.duty}</span>
              </li>
            </h3>
          </div>
          <div className={styles.publication}>
            <span className={styles.data_publication}>
              <p className={styles.data_public_desc}>
                Дата публикации {detailVacancy?.created_date}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
