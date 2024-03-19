import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById } from "../../../store/slices/employeeDetailsSlice";
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
  const { staff } = useSelector((state) => state.employeeDetails);
  const { id } = useParams();
  const [value, setValue] = useState("1");
  console.log(staff);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getProfileById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Личные данные" value="1" />
                {/* <Tab label="Образование" value="2" /> */}
              </TabList>
            </Box>
            <TabPanel value="1" style={{ padding: "50px 0" }}>
              <div className={styles.user_img}>
                <Avatar
                  src={staff.profile_photo}
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
                      {staff?.first_name} {staff?.last_name} {staff?.middle_name}
                    </h4>
                    <p>
                      <span>Дата рождения: </span>
                      {staff?.date_of_birth}
                    </p>
                    <p>
                      <span>Пол:</span> {staff?.gender_en}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.ul}>
                <h4>Гражданство(ru)</h4>
                <p>
                  <span>Нацинальность:</span> <span>{staff?.nationality_ru}</span>
                </p>
                <p>
                  <span>Место рождения:</span> <span>{staff?.birth_country_ru}</span>
                </p>
                <p>
                  <span>Область/Регион:</span> <span>{staff?.birth_region_ru}</span>
                </p>
              </div>
              {/* <div className={styles.ul}>
                <h4>Гражданство(en)</h4>
                <p>
                  <span>Нацинальность:</span> <span>{staff?.nationality_en}</span>
                </p>
                <p>
                  <span>Место рождения:</span> <span>{staff?.birth_country_en}</span>
                </p>
                <p>
                  <span>Область/Регион:</span> <span>{staff?.birth_region_en}</span>
                </p>
              </div> */}

              <div className={styles.ul}>
                <h4>Вледение языков</h4>
                <p>
                  <span>Китайский:</span> <span>{staff?.chinese}</span>
                </p>
                <p>
                  <span>Английский:</span> <span>{staff?.english}</span>
                </p>
                <p>
                  <span>Немеций:</span> <span>{staff?.german}</span>
                </p>
                <p>
                  <span>Русский:</span> <span>{staff?.russian}</span>
                </p>
                <p>
                  <span>Турецкий:</span> <span>{staff?.turkish}</span>
                </p>
              </div>

              <div className={styles.ul}>
                <h4>Уровень владения языком</h4>
                <p>
                  <span>Немеций:</span> <span>{staff?.german_level}</span>
                </p>
                <p>
                  <span>Английский:</span> <span>{staff?.english_level}</span>
                </p>
                <p>
                  <span>Русский:</span> <span>{staff?.russian_level}</span>
                </p>
                <p>
                  <span>Китайский:</span> <span>{staff?.chinese_level}</span>
                </p>
                <p>
                  <span>Турецкий:</span> <span>{staff?.turkish_level}</span>
                </p>
              </div>
            </TabPanel>
            {/* <TabPanel value="2">Образование</TabPanel> */}
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default ListStudentsDetailStaff;
