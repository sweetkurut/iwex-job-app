import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./staff.module.sass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterview_staff } from "../../store/slices/employeeDetailsSlice";
import { MdOutlinePhone } from "react-icons/md";
import { CgCalendarToday } from "react-icons/cg";
import { GrLanguage } from "react-icons/gr";
import { FaGenderless } from "react-icons/fa";
import { Avatar } from "@mui/material";
import Loaders from "../../UI/loaders";
import { useParams } from "react-router";

const InterviewStaffComponent = () => {
  const { interview, isLoading } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();
  const { vacancy_review, users, employer_company } = { ...interview[0] };
  const { id } = useParams();

  useEffect(() => {
    dispatch(getInterview_staff(id));
  }, [dispatch, id]);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {isLoading && <Loaders />}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Компания" value="1" />
                  <Tab label="Вакансия" value="2" />
                  <Tab label="Студенты" value="3" />
                </TabList>
                <button className={styles.btn}>
                  Подтвердить собеседования
                </button>
              </Box>
              <TabPanel value="1">
                <div className={styles.wrapper_company}>
                  <div className={styles.contact}>
                    <Avatar
                      src={employer_company?.icon}
                      alt={employer_company?.icon}
                      loading="lazy"
                      sx={{
                        width: '100px',
                        height: '100px',
                        marginRight: '20px',
                        objectFit: "cover",
                        borderRadius: "20px",
                        background: "#cacaca",
                        zIndex: -1,
                      }}

                    />
                    <div className={styles.box_name}>
                      <h4>{employer_company?.name}</h4>
                      <p>
                        <span>ФИО:</span> {employer_company?.first_name} {employer_company?.last_name}
                      </p>
                      <p>
                        <span>Контактное лицо:</span> {employer_company?.contact_person}
                      </p>
                      <p>
                        <span>Позиция:</span> {employer_company?.position}
                      </p>
                      <p>
                        <span>Реквизиты компании:</span> {employer_company?.payment_info}
                      </p>
                      <p>
                        <span>ИИН:</span> {employer_company?.iin}
                      </p>
                    </div>
                  </div>
                  <h4 className={styles.title_ul}>Описание</h4>
                  <div className={styles.boxListCompany}>
                    <p>{employer_company?.description}</p>
                  </div>
                  <h4 className={styles.title_ul}>Контакты</h4>
                  <div className={styles.boxListCompany}>
                    <p>{employer_company?.contact_info}</p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div role="presentation">
                  {isLoading && <Loaders />}
                  <div className={styles.user_img}>
                    <Avatar
                      src={vacancy_review?.employer_company_icon}
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
                          {vacancy_review?.name_vacancies} {vacancy_review?.position}
                        </h4>
                        <p>
                          <span>Зарплата: </span>
                          {vacancy_review?.salary}
                        </p>
                        <p>
                          <span>Филиал: </span>
                          {vacancy_review?.branch}
                        </p>
                        <p>
                          <span>Город:</span> {vacancy_review?.branch_city}
                        </p>
                        <p>
                          <span>E-mail:</span> {vacancy_review?.email_info}
                        </p>
                        <p>
                          <span>Кол-во просмотров:</span> {vacancy_review?.views_vacancy}
                        </p>
                        <p>
                          <span>Дата публикации:</span> {vacancy_review?.created_date}
                        </p>
                      </div>
                      <div className={styles.wrapper_btn}>
                        <p className={styles.phone}>
                          {vacancy_review?.salary} <span>Euro</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.ul}>
                    <h4>Основная информация(ru)</h4>
                    <p>
                      <span>Начало времени работы:</span> <span>{vacancy_review?.time_start}</span>
                    </p>
                    <p>
                      <span>Конец времени работы:</span> <span>{vacancy_review?.time_end}</span>
                    </p>
                    <p>
                      <span>Адресс Филиала:</span> <span>{vacancy_review?.branch_address}</span>
                    </p>
                    <p>
                      <span>Страховка:</span> <span>{vacancy_review?.insurance}</span>
                    </p>
                    <p>
                      <span>Транспорт:</span> <span>{vacancy_review?.vehicle}</span>
                    </p>
                  </div>

                  <div className={styles.ul}>
                    <h4>Требования(ru)</h4>
                    <p>
                      <span>Стаж работы:</span> <span>{vacancy_review?.experience}</span>
                    </p>
                    <p>
                      <span>Конец времени работы:</span> <span>{vacancy_review?.time_end}</span>
                    </p>
                    <p>
                      <span>Требования работадателя:</span> <span>{vacancy_review?.duty}</span>
                    </p>
                    <p>
                      <span>Описание:</span> <span>{vacancy_review?.description}</span>
                    </p>
                    <p>
                      <span>Знание немецкого языка:</span>{" "}
                      <span>{vacancy_review?.language_german}</span>
                    </p>
                    <p>
                      <span>Знание английского языка:</span>{" "}
                      <span>{vacancy_review?.language_english}</span>
                    </p>
                    <p>
                      <span>Рабочая форма:</span> <span>{vacancy_review?.clothingform}</span>
                    </p>
                    <p>
                      <span>Количество рабочих мест:</span>{" "}
                      <span>{vacancy_review?.employee_count}</span>
                    </p>
                    <p>
                      <span>Количество нанятых работников:</span>
                      <span>{vacancy_review?.employee_count_hired}</span>
                    </p>
                    <p>
                      <span>Условия работы:</span> <span>{vacancy_review?.conditions}</span>
                    </p>
                    <p>
                      <span>Требования:</span> <span>{vacancy_review?.requirements}</span>
                    </p>
                  </div>

                  <div className={styles.ul}>
                    <h4>Жильё(ru)</h4>
                    <p>
                      <span>Жильё:</span>{" "}
                      <span>{vacancy_review?.type_of_housing ? "Да" : "Нет"}</span>
                    </p>
                    <p>
                      <span>Стоимость жилья:</span> <span>{vacancy_review?.housing_cost}</span>
                    </p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className={styles.cards}>
                  {users?.map((elem) => (
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
                          <span className={styles.phone_num}>Телефон: {elem?.phone}</span>
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
                        {/* <Link
                      to={"/student-detail/" + elem.id}
                      state={{ id_vacancy: state.id_vacancy }}
                      className={styles.btn_link}>
                      Подробнее
                    </Link> */}
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
};

export default InterviewStaffComponent;
