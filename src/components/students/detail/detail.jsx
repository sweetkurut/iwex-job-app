import { useDispatch, useSelector } from "react-redux";
import styles from "./detail.module.sass";
import React, { useEffect, useState } from "react";
import { getEmployeeDetail, sendInvitation } from "../../../store/slices/employeeDetailsSlice";
import Loaders from "../../../UI/loaders";
import { GoHome } from "react-icons/go";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Avatar,
  Breadcrumbs,
  Typography,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ModalCalendar from "../../calendar/Calendar";

const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let { state } = useLocation();
  const { detailEmployee, isLoading } = useSelector((state) => state.employeeDetails);
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const [modalMessage, setModalMessage] = useState({ title: "", text: "" });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [favorites, setFavorites] = useState(false);

  useEffect(() => {
    dispatch(getEmployeeDetail(id));
  }, [id]);

  const HandlerInvitation = async () => {
    const data = { user: id, vacancy: state.id_vacancy };
    try {
      const response = await dispatch(sendInvitation(data)).unwrap();
      if (response) {
        setModalMessage({ title: "Успех", text: "You have successfully invite" });
        setOpen(true);
      }
    } catch (error) {
      setModalMessage({ title: "Ошибка", text: error.toString() || "An unknown error occurred" });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalConfirm = () => {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{modalMessage.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{modalMessage.text}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
  return (
    <>
      <ModalCalendar open={openCalendar} setOpen={setOpenCalendar} />
      {open && modalConfirm()}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {isLoading && <Loaders />}
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link color="inherit" to="/" className={styles.link_to_home}>
              <GoHome />
            </Link>
            <Link to="/students" state={{ id_vacancy: state.id_vacancy }}>
              Все студенты
            </Link>
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
                    <Tab label="Образование" value="3" />
                  </TabList>
                </Box>
                <TabPanel style={{ padding: "50px 0" }} value="1">
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
                      <div className={styles.wrapper_btn}>
                        <button className={styles.btn} onClick={() => setOpenCalendar(true)}>
                          Назначить собеседования
                        </button>
                        <button onClick={HandlerInvitation} className={styles.btn}>
                          Пригласить без собеседования
                        </button>
                        <button onClick={() => setFavorites(!favorites)} className={styles.btn}>
                          {favorites ?
                            <FaHeart size={20} />
                            :
                            <FaRegHeart size={20} />
                          }
                        </button>
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
                    <h4>Уровень владения языком</h4>
                    <p>
                      <span>Немеций:</span> <span>{detailEmployee?.german}</span>
                    </p>
                    <p>
                      <span>Английский:</span> <span>{detailEmployee?.english}</span>
                    </p>
                    <p>
                      <span>Русский:</span> <span>{detailEmployee?.russian}</span>
                    </p>
                  </div>
                </TabPanel>
                <TabPanel style={{ padding: "50px 0" }} value="3">
                  {detailEmployee &&
                  detailEmployee.universities &&
                  detailEmployee.universities.length > 0 ? (
                    detailEmployee.universities.map((elem) => (
                      <div key={elem?.id}>
                        <div className={styles.ul}>
                          <h4>Наименование Университета(Ru,En,De)</h4>
                          <p>
                            <span>Ru:</span> <span>{elem?.address_ru}</span>
                          </p>
                          <p>
                            <span>En:</span> <span>{elem?.address_en}</span>
                          </p>
                          <p>
                            <span>De:</span> <span>{elem?.address_de}</span>
                          </p>
                        </div>
                        <div className={styles.ul}>
                          <h4>Степень(Ru,En,De)</h4>
                          <p>
                            <span>Тип степени:</span> <span>{elem?.degree_type_ru}</span>
                          </p>
                          <p>
                            <span>Degree type:</span> <span>{elem?.degree_type_en}</span>
                          </p>
                          <p>
                            <span>Abschlussart:</span> <span>{elem?.degree_type_ву}</span>
                          </p>
                        </div>
                        <div className={styles.ul}>
                          <h4>Факультет(Ru,En,De)</h4>
                          <p>
                            <span>Факультет:</span> <span>{elem?.faculty_ru}</span>
                          </p>
                          <p>
                            <span>Faculty:</span> <span>{elem?.faculty_en}</span>
                          </p>
                          <p>
                            <span>Fachbereich:</span> <span>{elem?.faculty_de}</span>
                          </p>
                        </div>
                        <div className={styles.ul}>
                          <h4>Адресс(Ru,En,De)</h4>
                          <p>
                            <span>Адрес:</span> <span>{elem?.address_ru}</span>
                          </p>
                          <p>
                            <span>Address:</span> <span>{elem?.address_en}</span>
                          </p>
                          <p>
                            <span>Adresse:</span> <span>{elem?.address_de}</span>
                          </p>
                        </div>
                        <div className={styles.ul}>
                          <h4>Контакты(Ru,En,De)</h4>
                          <p>
                            <span>Phone:</span> <span>{elem?.phone_number_university_ru}</span>
                          </p>
                          <p>
                            <span>E-mail:</span> <span>{elem?.email_university}</span>
                          </p>
                          <p>
                            <span>Web-site:</span> <span>{elem?.website_university}</span>
                          </p>
                        </div>
                        <div className={styles.ul}>
                          <h4>Данные об учебе</h4>
                          <p>
                            <span>Начало учёбы:</span> <span>{elem?.start_date}</span>
                          </p>
                          <p>
                            <span>Конец учёбы:</span> <span>{elem?.end_date}</span>
                          </p>
                          <p>
                            <span>Длительность обучений:</span> <span>{elem?.total_years}</span>
                          </p>
                          <p>
                            <span>Курс:</span> <span>{elem?.kurs_year}</span>
                          </p>
                          <p>
                            <span>Начало каникул:</span> <span>{elem?.start_holiday}</span>
                          </p>
                          <p>
                            <span>Конец каникул:</span> <span>{elem?.end_holiday}</span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.student_search}>
                      <div className={styles.student_img}>
                        <img
                          alt="img-student"
                          src="/obrazovanie.svg"
                          style={{
                            width: "350px",
                          }}
                        />
                      </div>
                      <p className={styles.student_search_title}>
                        Информация об образовании не найдены
                      </p>
                    </div>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetail;
