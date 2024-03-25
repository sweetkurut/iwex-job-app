import { useEffect } from "react";
import styles from "./detail.module.sass";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVacancyDetail } from "../../../../../store/slices/vacancySlice";
import Loaders from "../../../../../UI/loaders";
import { GoHome } from "react-icons/go";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailVacancy, isLoading } = useSelector((state) => state.vacancy);

  console.log(detailVacancy);
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
              src={detailVacancy?.employer_company_icon}
              alt="user-photo"
              loading="lazy"
              sx={{
                width: "250px",
                objectFit: "cover",
                height: "250px",
                borderRadius: "20px",
                background: "#cacaca",
                zIndex: -1,
              }}
            />
            <div className={styles.userName_surname}>
              <div className={styles.box_name}>
                <h4>
                  {detailVacancy?.name_vacancies} {detailVacancy?.position}
                </h4>
                <p>
                  <span>Зарплата: </span>
                  {detailVacancy?.salary}
                </p>
                <p>
                  <span>Филиал: </span>
                  {detailVacancy?.branch}
                </p>
                <p>
                  <span>Город:</span> {detailVacancy?.branch_city}
                </p>
                <p>
                  <span>E-mail:</span> {detailVacancy?.email_info}
                </p>
                <p>
                  <span>Кол-во просмотров:</span> {detailVacancy?.views_vacancy}
                </p>
                <p>
                  <span>Дата публикации:</span> {detailVacancy?.created_date}
                </p>
              </div>
              <div className={styles.wrapper_btn}>
                <p className={styles.phone}>{detailVacancy?.salary} <span>Euro</span></p>
                <Link to={"/students"} state={{ id_vacancy: id }} className={styles.btn}>
                  Найти студента
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.ul}>
            <h4>Основная информация(ru)</h4>
            <p>
              <span>Начало времени работы:</span> <span>{detailVacancy?.time_start}</span>
            </p>
            <p>
              <span>Конец времени работы:</span> <span>{detailVacancy?.time_end}</span>
            </p>
            <p>
              <span>Адресс Филиала:</span> <span>{detailVacancy?.branch_address}</span>
            </p>
            <p>
              <span>Страховка:</span> <span>{detailVacancy?.insurance}</span>
            </p>
            <p>
              <span>Транспорт:</span> <span>{detailVacancy?.vehicle}</span>
            </p>
          </div>

          <div className={styles.ul}>
            <h4>Требования(ru)</h4>
            <p>
              <span>Стаж работы:</span> <span>{detailVacancy?.experience}</span>
            </p>
            <p>
              <span>Конец времени работы:</span> <span>{detailVacancy?.time_end}</span>
            </p>
            <p>
              <span>Требования работадателя:</span> <span>{detailVacancy?.duty}</span>
            </p>
            <p>
              <span>Описание:</span> <span>{detailVacancy?.description}</span>
            </p>
            <p>
              <span>Знание немецкого языка:</span> <span>{detailVacancy?.language_german}</span>
            </p>
            <p>
              <span>Знание английского языка:</span> <span>{detailVacancy?.language_english}</span>
            </p>
            <p>
              <span>Рабочая форма:</span> <span>{detailVacancy?.clothingform}</span>
            </p>
            <p>
              <span>Количество рабочих мест:</span> <span>{detailVacancy?.employee_count}</span>
            </p>
            <p>
              <span>Количество нанятых работников:</span>
              <span>{detailVacancy?.employee_count_hired}</span>
            </p>
            <p>
              <span>Условия работы:</span> <span>{detailVacancy?.conditions}</span>
            </p>
            <p>
              <span>Требования:</span> <span>{detailVacancy?.requirements}</span>
            </p>
          </div>

          <div className={styles.ul}>
            <h4>Жильё(ru)</h4>
            <p>
              <span>Жильё:</span> <span>{detailVacancy?.type_of_housing ? "Да" : "Нет"}</span>
            </p>
            <p>
              <span>Стоимость жилья:</span> <span>{detailVacancy?.housing_cost}</span>
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CardDetail;
