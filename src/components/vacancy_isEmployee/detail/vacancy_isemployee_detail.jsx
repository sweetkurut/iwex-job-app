import { Link, useParams } from "react-router-dom";
import styles from "./style.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVacanciesById } from "../../../store/slices/vacancySlice.js";
import { GoHome } from "react-icons/go";
import Loaders from "../../../UI/loaders/index.jsx";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";

const Vacancy_isEmployee_Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailStaffVacancy, isLoading } = useSelector((state) => state.vacancy);

  console.log(detailStaffVacancy);

  useEffect(() => {
    dispatch(getVacanciesById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link color="inherit" to="/" className={styles.link_to_home}>
              <GoHome />
            </Link>
            <Link to="/vacancies-list">Все вакансии</Link>
            <Typography color="text.primary" className={styles.typography}>
              Подробная информация
            </Typography>
            <Typography color="text.primary" className={styles.typography}>
              {detailStaffVacancy?.employer_company_name}
            </Typography>
          </Breadcrumbs>
          {isLoading && <Loaders />}
          <div className={styles.user_img}>
            <Avatar
              src={detailStaffVacancy?.employer_company_icon}
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
                  {detailStaffVacancy?.name_vacancies} {detailStaffVacancy?.position}
                </h4>
                <p>
                  <span>Зарплата: </span>
                  {detailStaffVacancy?.salary}
                </p>
                <p>
                  <span>Филиал: </span>
                  {detailStaffVacancy?.branch.name}
                </p>
                <p>
                  <span>Город:</span> {detailStaffVacancy?.branch.city}
                </p>
                <p>
                  <span>Адресс:</span> {detailStaffVacancy?.branch.address}
                </p>
                {/* <p>
                  <span>E-mail:</span> {detailStaffVacancy?.email_info}
                </p> */}
                <p>
                  <span>Кол-во просмотров:</span> {detailStaffVacancy?.views_vacancy}
                </p>
                <p>
                  <span>Дата публикации:</span> {detailStaffVacancy?.created_date}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.ul}>
            <h4>Компания работадателя</h4>
            <p>
              <span>Название компании:</span>{" "}
              <span>{detailStaffVacancy?.employer_company.name}</span>
            </p>
            <p>
              <span>Имя работадателя:</span>{" "}
              <span>
                {detailStaffVacancy?.branch.company.first_name} <br />{" "}
                {detailStaffVacancy?.branch.company.last_name}
              </span>
            </p>
            <p>
              <span>Контакты:</span>{" "}
              <span>
                {detailStaffVacancy?.branch.company.contact_info}
                {detailStaffVacancy?.branch.company.contact_person}
              </span>
            </p>
            <p>
              <span>ИИН:</span>{" "}
              <span>
                {detailStaffVacancy?.branch.company.contact_info}
                {detailStaffVacancy?.branch.company.iin}
              </span>
            </p>
            <p>
              <span>Оплата:</span> <span>{detailStaffVacancy?.branch.company.payment_info}</span>
            </p>
            <p>
              <span>Позиция:</span> <span>{detailStaffVacancy?.branch.company.position}</span>
            </p>
          </div>
          <div className={styles.ul}>
            <h4>Основная информация(ru)</h4>
            <p>
              <span>Название компании:</span>{" "}
              <span>{detailStaffVacancy?.employer_company.name}</span>
            </p>
            <p>
              <span>Начало времени работы:</span> <span>{detailStaffVacancy?.time_start}</span>
            </p>
            <p>
              <span>Конец времени работы:</span> <span>{detailStaffVacancy?.time_end}</span>
            </p>
            {/* <p>
              <span>Адресс Филиала:</span> <span>{detailStaffVacancy?.branch_address}</span>
            </p> */}
            <p>
              <span>Страховка:</span> <span>{detailStaffVacancy?.insurance}</span>
            </p>
            <p>
              <span>Транспорт:</span> <span>{detailStaffVacancy?.vehicle}</span>
            </p>
          </div>

          <div className={styles.ul}>
            <h4>Требования(ru)</h4>
            <p>
              <span>Стаж работы:</span> <span>{detailStaffVacancy?.experience}</span>
            </p>
            <p>
              <span>Конец времени работы:</span> <span>{detailStaffVacancy?.time_end}</span>
            </p>
            <p>
              <span>Требования работадателя:</span> <span>{detailStaffVacancy?.duty}</span>
            </p>
            <p>
              <span>Описание:</span> <span>{detailStaffVacancy?.description}</span>
            </p>
            <p>
              <span>Знание немецкого языка:</span>{" "}
              <span>{detailStaffVacancy?.language_german}</span>
            </p>
            <p>
              <span>Знание английского языка:</span>{" "}
              <span>{detailStaffVacancy?.language_english}</span>
            </p>
            <p>
              <span>Рабочая форма:</span> <span>{detailStaffVacancy?.clothingform}</span>
            </p>
            <p>
              <span>Количество рабочих мест:</span>{" "}
              <span>{detailStaffVacancy?.employee_count}</span>
            </p>
            <p>
              <span>Количество нанятых работников:</span>
              <span>{detailStaffVacancy?.employee_count_hired}</span>
            </p>
            <p>
              <span>Условия работы:</span> <span>{detailStaffVacancy?.conditions}</span>
            </p>
            <p>
              <span>Требования:</span> <span>{detailStaffVacancy?.requirements}</span>
            </p>
          </div>

          <div className={styles.ul}>
            <h4>Жильё(ru)</h4>
            <p>
              <span>Жильё:</span> <span>{detailStaffVacancy?.type_of_housing ? "Да" : "Нет"}</span>
            </p>
            <p>
              <span>Стоимость жилья:</span> <span>{detailStaffVacancy?.housing_cost}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancy_isEmployee_Detail;
