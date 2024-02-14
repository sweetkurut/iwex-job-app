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
          <div className={styles.user_img}>
            <Avatar
              src={detailVacancy.employer_company_icon}
              alt="user-photo"
              loading="lazy"
              sx={{
                width: "250px",
                objectFit: "cover",
                height: "250px",
                borderRadius: "20px",
                background: '#cacaca',
                zIndex: -1
              }}
            />
            <div className={styles.userName_surname}>
              <div className={styles.box_name}>
                <h4>{detailVacancy?.name_vacancies} {detailVacancy?.position} </h4>
                <p><span>Филиал: </span>{detailVacancy?.branch}</p>
                <p><span>Город:</span> {detailVacancy?.city}</p>
              </div>
              <div className={styles.wrapper_btn}>
                <p className={styles.phone}>{detailVacancy?.salary} Euro</p>
                <Link to={"/students"} state={{ id_vacancy: id }} className={styles.btn}>Найти студента</Link>
              </div>
            </div>
          </div>
          <div className={styles.ul}>
            <h4>Основная информация(ru)</h4>
            <p><span>Начало времени работы:</span> <span>{detailVacancy?.time_start}</span></p>
            <p><span>Конец времени работы:</span> <span>{detailVacancy?.time_end}</span></p>
            <p><span>Область/Регион:</span> <span>{detailVacancy?.birth_region_ru}</span></p>
          </div>

          <div className={styles.ul}>
            <h4>Требования(ru)</h4>
            <p><span>Стаж работы:</span> <span>{detailVacancy?.experience}</span></p>
            <p><span>Конец времени работы:</span> <span>{detailVacancy?.time_end}</span></p>
            <p><span>Область/Регион:</span> <span>{detailVacancy?.birth_region_ru}</span></p>
          </div>




          {/* <Avatar
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
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default CardDetail;
