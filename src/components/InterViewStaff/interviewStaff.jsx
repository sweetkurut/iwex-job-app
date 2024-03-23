import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./staff.module.sass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewList } from "../../store/slices/employeeDetailsSlice";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";
import { WiTime9 } from "react-icons/wi";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlinePhone, MdOutlineWorkOutline } from "react-icons/md";
import { CgCalendarToday } from "react-icons/cg";
import { GrLanguage } from "react-icons/gr";
import { FaGenderless, FaRegAddressCard } from "react-icons/fa";

const InterviewStaffComponent = () => {
  const { interview } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();

  console.log(interview);

  useEffect(() => {
    dispatch(getInterviewList());
  }, [dispatch]);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Вакансия" value="1" />
                <Tab label="Отклики" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className={styles.cards}>
                {interview?.map((elem) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className={styles.card} key={elem?.id}>
                    <div className={styles.vacancies_name}>
                      <MdOutlineWorkOutline className={styles.vacancies_icon} />
                      <div>
                        <h5 className={styles.name_branch}>Филиал:{elem?.vacancy_review.branch}</h5>
                        <h5 className={styles.name_company}>
                          Компания:
                          {elem?.vacancy_review.employer_company_name}
                        </h5>
                        <h3 className={styles.name}>
                          Адресс филиала:{elem?.vacancy_review.branch_address}
                        </h3>
                        <h3 className={styles.name}>Город:{elem?.vacancy_review.branch_city}</h3>
                      </div>
                    </div>
                    <div className={styles.position}>
                      <h3>Позиция: {elem?.vacancy_review.position}</h3>
                      <h3>Зарплата: {elem?.vacancy_review.salary}</h3>
                    </div>
                    <div className={styles.card_descriptions}>
                      <h3 className={styles.time_graphic}>
                        <LuCalendarClock />
                        График работы:
                      </h3>
                      <div className={styles.time}>
                        <WiTime9 className={styles.watch} />
                        <p className={styles.graphic_day}>{elem?.vacancy_review.time_start}</p>
                      </div>
                      <div className={styles.time}>
                        <WiTime9 className={styles.watch} />
                        <p className={styles.graphic_day}>{elem?.vacancy_review.time_end}</p>
                      </div>
                    </div>
                    <div className={styles.stage_work}>
                      <h3 className={styles.stage_tite}>
                        <GiNetworkBars />
                        Стаж работы:
                      </h3>
                      <h5 className={styles.stage_desc}>{elem?.vacancy_review.experience}</h5>
                    </div>

                    <div className={styles.emplouee_count}>
                      <h3 className={styles.count}>Количество мест:</h3>
                      <h5>{elem?.vacancy_review.employee_count}</h5>
                    </div>
                    {/* 
                    <div className={styles.card_button}>
                      <Link to={"/vacancy-detail/" + elem?.id} className={styles.btn_link}>
                        Подробнее
                      </Link>
                    </div> */}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              {interview?.map((elem) => (
                // eslint-disable-next-line react/jsx-key
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
                      <h3 className={styles.name}>{elem?.users[0].first_name}</h3>
                      <h5 className={styles.name_company}>{elem?.users[0].last_name}</h5>
                    </div>
                  </div>
                  <div className={styles.card_descriptions}>
                    <h3 className={styles.user_data}>Личные данные:</h3>
                    <div className={styles.number}>
                      <MdOutlinePhone className={styles.icon_phone} />
                      <span className={styles.phone_num}>
                        Номер телефона: {elem?.users[0].phone}
                      </span>
                    </div>

                    <p className={styles.birth_day}>
                      <FaRegAddressCard />
                      Гражданство:{elem?.users[0].nationality_en}
                    </p>
                    <p className={styles.birth_day}>
                      <CgCalendarToday />
                      День рождение:{elem?.users[0].date_of_birth}
                    </p>

                    <p className={styles.birth_day}>
                      <GrLanguage />
                      Знание английского языка:{elem?.users[0].english}
                    </p>
                    <p className={styles.graphic_day}>
                      <FaGenderless />
                      Пол:{elem?.users[0].gender_en}
                    </p>
                  </div>
                  {/* <div className={styles.card_button}>
                  <Link
                    to={"/student-detail/" + elem.id}
                    state={{ id_vacancy: state.id_vacancy }}
                    className={styles.btn_link}>
                    Подробнее
                  </Link>
                </div> */}
                </div>
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default InterviewStaffComponent;
