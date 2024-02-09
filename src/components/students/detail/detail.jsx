import { useDispatch, useSelector } from "react-redux";
import styles from "./detail.module.sass";
import { useEffect, useState } from "react";
import { getEmployeeDetail } from "../../../store/slices/employeeDetailsSlice";
import Loaders from "../../../UI/loaders";
import { GoHome } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailEmployee, isLoading } = useSelector((state) => state.employeeDetails);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(detailEmployee);

  useEffect(() => {
    dispatch(getEmployeeDetail(id));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isLoading && <Loaders />}
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
          <Link color="inherit" to="/" className={styles.link_to_home}>
            <GoHome />
          </Link>
          <Link to="/students">Все студенты</Link>
          <Typography color="text.primary" className={styles.typography}>
            Подробная информация
          </Typography>
          <Typography color="text.primary" className={styles.typography}>
            {detailEmployee?.first_name}
          </Typography>
        </Breadcrumbs>
        <div className={styles.card}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Личные данные" value="1" />
                  <Tab label="Знание языков" value="2" />
                  <Tab label="Образование" value="3" />
                  {/* <Tab label="Изображение" value="4" /> */}
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className={styles.user_img}>
                  <Avatar
                    src={detailEmployee.profile_photo}
                    alt="user-photo"
                    loading="lazy"
                    sx={{
                      width: "300px",
                      objectFit: "cover",
                      height: "300px",
                    }}
                  />
                </div>
                <div className={styles.user_number}>
                  <h4 className={styles.fio}></h4>
                  <p>Дата рождения: {detailEmployee?.date_of_birth}</p>
                  <p>Номер: {detailEmployee?.phone}</p>
                  <p>Номер WhatSapp: {detailEmployee?.whatsapp_phone_number}</p>
                </div>

                <div className={styles.userName_surname}>
                  <h4 className={styles.fio}>ФИО(ru)</h4>
                  <p>Имя: {detailEmployee?.first_name_ru}</p>
                  <p>Фамилия: {detailEmployee?.last_name_ru}</p>
                  <p>Отчество: {detailEmployee?.middle_name_ru}</p>
                  <p>Пол: {detailEmployee?.gender_ru}</p>
                </div>

                <div className={styles.userName_surname}>
                  <h4 className={styles.fio}>ФИО(en)</h4>
                  <p>Имя: {detailEmployee?.first_name}</p>
                  <p>Фамилия: {detailEmployee?.last_name}</p>
                  <p>Отчество: {detailEmployee?.middle_name}</p>
                  <p>Пол: {detailEmployee?.gender_en}</p>
                </div>

                <h4 className={styles.fio}>Пол на немецком</h4>
                <p>Пол: {detailEmployee?.gender_de}</p>

                <h4 className={styles.fio}>Гражданство(ru)</h4>
                <p>Нацинальность: {detailEmployee?.nationality_ru}</p>
                <p>Место рождения: {detailEmployee?.birth_country_ru}</p>
                <p>Область/Регион: {detailEmployee?.birth_region_ru}</p>

                <h4 className={styles.fio}>Гражданство(en)</h4>
                <p>Нацинальность: {detailEmployee?.nationality_en}</p>
                <p>Место рождения: {detailEmployee?.birth_country_en}</p>
                <p>Область/Регион: {detailEmployee?.birth_region_en}</p>

                <h4 className={styles.fio}>Гражданство(de)</h4>
                <p>Нацинальность: {detailEmployee?.nationality_de}</p>
                <p>Место рождения: {detailEmployee?.birth_country_de}</p>
                <p>Область/Регион: {detailEmployee?.birth_region_de}</p>
              </TabPanel>
              <TabPanel value="2">
                <h4 className={styles.data_lang}>Уровень владения</h4>
                <p>Немеций:{detailEmployee?.german}</p>
                <p>Английский:{detailEmployee?.english}</p>
                <p>Русский:{detailEmployee?.russian}</p>
              </TabPanel>
              <TabPanel value="3">
                <h4>
                  {detailEmployee?.universities?.map((elem) => (
                    // eslint-disable-next-line react/jsx-key
                    <>
                      <div className={styles.name_universe}>
                        <h3 className={styles.sub_title}>Наименование</h3>
                        <p className={styles.name}> Название университета:{elem.address_ru}</p>
                        <p className={styles.name}> University name:{elem.address_en}</p>
                        <p className={styles.name}> Name der Universität:{elem.address_de}</p>
                      </div>
                      <div className={styles.type_universe_degree}>
                        <h3 className={styles.sub_title}>Степень</h3>
                        <p className={styles.name}> Тип степени:{elem.degree_type_ru}</p>
                        <p className={styles.name}> Degree type:{elem.degree_type_en}</p>
                        <p className={styles.name}> Abschlussart:{elem.degree_type_de}</p>
                      </div>
                      <div className={styles.facultet}>
                        <h3 className={styles.sub_title}>Факультет</h3>
                        <p className={styles.name}> Факультет:{elem.faculty_ru}</p>
                        <p className={styles.name}> Faculty:{elem.faculty_en}</p>
                        <p className={styles.name}> Fachbereich:{elem.faculty_de}</p>
                      </div>
                      <div className={styles.address}>
                        <h3 className={styles.sub_title}>Адресс</h3>
                        <p className={styles.name}> Адресс:{elem.address_ru}</p>
                        <p className={styles.name}> Address:{elem.address_en}</p>
                        <p className={styles.name}> Adresse:{elem.address_de}</p>
                      </div>
                      <div className={styles.universe_phone}>
                        <h3 className={styles.sub_title}>Контакты</h3>
                        <p className={styles.name}> Контакты:{elem.phone_number_university_ru}</p>
                        <p className={styles.name}> E-mail:{elem.email_university}</p>
                        <p className={styles.name}> Web-site:{elem.website_university}</p>
                      </div>
                      <div className={styles.data_holiday}>
                        <h3 className={styles.sub_title}>Данные об учебе </h3>
                        <p className={styles.name}> Начало учёбы:{elem.start_date}</p>
                        <p className={styles.name}> Конец учёбы:{elem.end_date}</p>
                        <p className={styles.name}> Длительность обучений:{elem.total_years}года</p>
                        <p className={styles.name}> Курс:{elem.kurs_year}</p>
                        <p className={styles.name}> Начало каникул:{elem.start_holiday}</p>
                        <p className={styles.name}> Конец каникул:{elem.end_holiday}</p>
                      </div>
                    </>
                  ))}
                </h4>
              </TabPanel>
              <TabPanel value="4">
                <div className={styles.user_img}>
                  <Avatar
                    src={detailEmployee.profile_photo}
                    alt="user-photo"
                    sx={{
                      width: "400px",
                      objectFit: "cover",
                      height: "400px",
                    }}
                  />
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
