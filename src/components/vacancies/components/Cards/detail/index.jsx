import { useEffect } from "react";
import styles from "./detail.module.sass";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyDetail } from "../../../../../store/slices/vacancySlice";
import Loaders from "../../../../../UI/loaders";
import { GoHome } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { RiSearchLine } from "react-icons/ri";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailVacancy, isLoading } = useSelector((state) => state.vacancy);

  // const showEditForm = () => {
  //   setIsShow(!isShow);
  // };

  useEffect(() => {
    dispatch(getVacancyDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link color="inherit" to="/" className={styles.link_to_home}>
              <GoHome />
            </Link>
            <Link to="/vacancies">Мои вакансии</Link>
            <Typography color="text.primary" className={styles.typography}>
              Подробная информация
            </Typography>
            <Typography color="text.primary" className={styles.typography}>
              {detailVacancy?.employer_company_name}
            </Typography>
          </Breadcrumbs>
          {isLoading && <Loaders />}
          <Avatar
            alt="Remy Sharp"
            src={detailVacancy?.employer_company_icon}
            sx={{ width: 250, height: 250 }}
            className={styles.profile_img}
            loading={"lazy"}
          />
          <h2 className={styles.name_vacancies}>{detailVacancy?.position}</h2>
          <h4>{detailVacancy?.branch}</h4>
        </div>
        <div className={styles.card}>
          <div className={styles.card_data_titles}>
            <p className={styles.card_data}>
              <li>
                Зарплата: <span>{detailVacancy?.salary}</span>
              </li>
            </p>
            <p className={styles.card_data}>
              <li>Город: {detailVacancy?.branch_city}</li>
            </p>
            <p className={styles.card_data}>
              <li>Филиал: {detailVacancy?.branch_address}</li>
            </p>
            <p className={styles.card_data}>
              <li>Дресс-Код: {detailVacancy?.clothingform}</li>
            </p>
            <h3 className={styles.card_data}>
              <li>Начало времени работы: {detailVacancy?.time_start}</li>
            </h3>
            <p className={styles.card_data}>
              <li>Конец времени работы: {detailVacancy?.time_end}</li>
            </p>
          </div>
          <div className={styles.card_data_desc}>
            <div className={styles.trebovanya}>
              Требования работадателя:
              <p className={styles.card_data}>
                <li>
                  Стаж работы: <span>{detailVacancy?.experience}</span>
                </li>
              </p>
              <p>
                <li>
                  Знание немецкого: <span>{detailVacancy?.language_german}</span>
                </li>
              </p>
              <p>
                <li>
                  Знание английского: <span>{detailVacancy?.language_english}</span>
                </li>
              </p>
              <p>
                <li>
                  Количество мест на вакансию: <span>{detailVacancy?.employee_count}</span>
                </li>
              </p>
            </div>
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
          <div className={styles.btn_wrap}>
            <Link to={"/vacancy"} state={{ id_vacancy: id }} className={styles.btn}>
              <CiEdit className={styles.edit_icon} />
              Редактировать данные
            </Link>
          </div>
        </div>
        <Link to={"/students"} state={{ id_vacancy: id }} className={styles.link_search_btn}>
          <RiSearchLine />
          Найти студента
        </Link>
      </div>
    </div>
  );
};

export default CardDetail;
