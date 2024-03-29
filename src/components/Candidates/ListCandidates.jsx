import { useDispatch, useSelector } from "react-redux";
import styles from "./cancidates.module.sass";
import { useEffect, useState } from "react";
import { SendFavorite, getAllEmployee } from "../../store/slices/employeeDetailsSlice";
import { SceletonCardVacancy } from "../SceletonLoading/SceletonLoading";
import { MdOutlinePhone } from "react-icons/md";
import { CgCalendarToday } from "react-icons/cg";
import { GrLanguage } from "react-icons/gr";
import { FaGenderless } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const ListCandidates = () => {
  const dispatch = useDispatch();
  const { employee, isLoading } = useSelector((state) => state.employeeDetails);
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(() => {
    // Извлекаем состояние из локального хранилища при загрузке компонента
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : {};
  });

  // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  const handleClick = (id) => {
    navigate(`/all-candidates-detail/${id}`);
  };

  const handleFavorite = async (e, employeeId) => {
    e.stopPropagation();
    const data = {
      user: employeeId,
    };

    try {
      const res = await dispatch(SendFavorite(data)).unwrap();
      if (res && res.is_favorite !== undefined) {
        // Обновляем состояние и сохраняем его в локальное хранилище
        setFavorite((prevState) => {
          const updatedFavorite = { ...prevState, [employeeId]: res.is_favorite };
          localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
          return updatedFavorite;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Список кандидатов</h2>
        <div className={styles.cards}>
          {isLoading ? (
            <SceletonCardVacancy />
          ) : employee && employee.length > 0 ? (
            employee.map((elem) => (
              <div className={styles.card} key={elem?.id} onClick={() => handleClick(elem.id)}>
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
                    <span className={styles.phone_num}>Номер телефона: {elem?.phone}</span>
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
                  <Link to={"/all-candidates-detail/" + elem?.id} className={styles.btn_link}>
                    Подробнее
                  </Link>
                  <button className={styles.btn_fav} onClick={(e) => handleFavorite(e, elem.id)}>
                    {favorite[elem.id] ? <IoBookmark size={20} /> : <IoBookmarkOutline size={20} />}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.student_search}>
              <div className={styles.student_img}>
                <img
                  alt="img-student"
                  src="/img/student.svg"
                  style={{
                    width: "500px",
                  }}
                />
              </div>
              <p className={styles.student_search_title}>Не найдено ни одного студента.</p>
              <button
                className={styles.btn_allStudents}
                onClick={(e) => {
                  handleChange(e, false);
                }}>
                Добавить студента
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListCandidates;
