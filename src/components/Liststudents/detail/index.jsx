import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetail } from "../../../store/slices/employeeDetailsSlice";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./detaiil.module.sass";
import { Avatar } from "@mui/material";

const ListStudentsDetailStaff = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailEmployee } = useSelector((state) => state.employeeDetails);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getEmployeeDetail(id));
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Личные данные" value="1" />
                <Tab label="Образование" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{ padding: "50px 0" }}>
              <div className={styles.user_img}>
                <Avatar
                  src={detailEmployee.profile_photo}
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
                      {detailEmployee?.first_name} {detailEmployee?.last_name}{" "}
                      {detailEmployee?.middle_name}
                    </h4>
                    <p>
                      <span>Дата рождения: </span>
                      {detailEmployee?.date_of_birth}
                    </p>
                    <p>
                      <span>Пол:</span> {detailEmployee?.gender_en}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.ul}>
                <h4>Гражданство(ru)</h4>
                <p>
                  <span>Нацинальность:</span> <span>{detailEmployee?.nationality_ru}</span>
                </p>
                <p>
                  <span>Место рождения:</span> <span>{detailEmployee?.birth_country_ru}</span>
                </p>
                <p>
                  <span>Область/Регион:</span> <span>{detailEmployee?.birth_region_ru}</span>
                </p>
              </div>

              <div className={styles.ul}>
                <h4>Вледение языков</h4>
                <p>
                  <span>Китайский:</span> <span>{detailEmployee?.chinese}</span>
                </p>
                <p>
                  <span>Английский:</span> <span>{detailEmployee?.english}</span>
                </p>
                <p>
                  <span>Немеций:</span> <span>{detailEmployee?.german}</span>
                </p>
                <p>
                  <span>Русский:</span> <span>{detailEmployee?.russian}</span>
                </p>
                <p>
                  <span>Турецкий:</span> <span>{detailEmployee?.turkish}</span>
                </p>
              </div>

              <div className={styles.ul}>
                <h4>Уровень владения языком</h4>
                <p>
                  <span>Немеций:</span> <span>{detailEmployee?.german_level}</span>
                </p>
                <p>
                  <span>Английский:</span> <span>{detailEmployee?.english_level}</span>
                </p>
                <p>
                  <span>Русский:</span> <span>{detailEmployee?.russian_level}</span>
                </p>
                <p>
                  <span>Китайский:</span> <span>{detailEmployee?.chinese_level}</span>
                </p>
                <p>
                  <span>Турецкий:</span> <span>{detailEmployee?.turkish_level}</span>
                </p>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className={styles.ul}>
                <h4>Образование(ru)</h4>
                <p>
                  <span>Университет:</span> <span>{detailEmployee?.universities[0].name_ru}</span>
                </p>
                <p>
                  <span>Адресс:</span> <span>{detailEmployee?.universities[0].address_ru}</span>
                </p>
                <p>
                  <span>Факультет:</span> <span>{detailEmployee?.universities[0].faculty_ru}</span>
                </p>
                <p>
                  <span>Тип обучения:</span>
                  <span>{detailEmployee?.universities[0].degree_type_ru}</span>
                </p>
              </div>
              <div className={styles.ul}>
                <h4>Education(en)</h4>
                <p>
                  <span>University:</span> <span>{detailEmployee?.universities[0].name_en}</span>
                </p>
                <p>
                  <span>Address:</span> <span>{detailEmployee?.universities[0].address_en}</span>
                </p>
                <p>
                  <span>Faculty:</span> <span>{detailEmployee?.universities[0].faculty_en}</span>
                </p>
                <p>
                  <span>Degree type:</span>
                  <span>{detailEmployee?.universities[0].degree_type_en}</span>
                </p>
              </div>
              <div className={styles.ul}>
                <h4>Ausbildung(de)</h4>
                <p>
                  <span>Universität:</span> <span>{detailEmployee?.universities[0].name_de}</span>
                </p>
                <p>
                  <span>Adresse:</span> <span>{detailEmployee?.universities[0].address_de}</span>
                </p>
                <p>
                  <span>Fakultät:</span> <span>{detailEmployee?.universities[0].faculty_de}</span>
                </p>
                <p>
                  <span>Art der Ausbildung:</span>
                  <span>{detailEmployee?.universities[0].degree_type_de}</span>
                </p>
              </div>
              <div className={styles.ul}>
                <h4>дополнительная информация</h4>
                <p>
                  <span>Email:</span>
                  <span>{detailEmployee?.universities[0].email_university}</span>
                </p>
                <p>
                  <span>Дата начало обучения:</span>
                  <span>{detailEmployee?.universities[0].start_date}</span>
                </p>
                <p>
                  <span>Дата конца обучения:</span>
                  <span>{detailEmployee?.universities[0].end_date}</span>
                </p>
                <p>
                  <span>Дата начала каникул </span>
                  <span>{detailEmployee?.universities[0].start_holiday}</span>
                </p>
                <p>
                  <span>Дата конца каникул </span>
                  <span>{detailEmployee?.universities[0].start_holiday}</span>
                </p>

                <p>
                  <span>Art der Ausbildung:</span>
                  <span>{detailEmployee?.universities[0].degree_type_de}</span>
                </p>
                <p>
                  <span>Общее количество лет:</span>
                  <span>{detailEmployee?.universities[0].total_years}</span>
                </p>
                <p>
                  <span>Курс:</span>
                  <span>{detailEmployee?.universities[0].kurs_year}</span>
                </p>
                <p>
                  <span>Веб-сайт:</span>
                  <span>{detailEmployee?.universities[0].website_university}</span>
                </p>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default ListStudentsDetailStaff;
