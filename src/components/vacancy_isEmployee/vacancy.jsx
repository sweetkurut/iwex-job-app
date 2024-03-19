import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.sass";
import { useEffect } from "react";
import { WiTime9 } from "react-icons/wi";
import { GiNetworkBars } from "react-icons/gi";
import { TbEyeSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { SceletonCardVacancy } from "../SceletonLoading/SceletonLoading";
import { getAllVacanciesStaffList } from "../../store/slices/vacancySlice";

const VacanciesEmployee = () => {
  const { isLoading, staffVacancy } = useSelector((state) => state.vacancy);
  const dispatch = useDispatch();

  console.log(staffVacancy);

  useEffect(() => {
    dispatch(getAllVacanciesStaffList());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {isLoading ? (
          <SceletonCardVacancy />
        ) : staffVacancy && staffVacancy?.length > 0 ? (
          staffVacancy?.map((elem) => (
            <div className={styles.card} key={elem?.id}>
              <div className={styles.vacancies_name}>
                <MdOutlineWorkOutline className={styles.vacancies_icon} />
                <div>
                  <h3 className={styles.name}>{elem?.position}</h3>
                  <h5 className={styles.name_company}>{elem?.branch?.name}</h5>
                </div>
              </div>
              <div className={styles.card_descriptions}>
                <h3 className={styles.time_graphic}>
                  <LuCalendarClock />
                  График работы:
                </h3>
                <div className={styles.time}>
                  <WiTime9 className={styles.watch} />
                  <p className={styles.graphic_day}>{elem?.time_start}</p>
                </div>
                <div className={styles.time}>
                  <WiTime9 className={styles.watch} />
                  <p className={styles.graphic_day}>{elem?.time_end}</p>
                </div>
              </div>
              <div className={styles.stage_work}>
                <h3 className={styles.stage_tite}>
                  <GiNetworkBars />
                  Стаж работы:
                </h3>
                <h5 className={styles.stage_desc}>{elem?.experience}</h5>
              </div>
              <div className={styles.views}>
                <h3>Просмотров:</h3>
                <h5 className={styles.views_desc}>
                  {elem?.views_vacancy}
                  <TbEyeSearch className={styles.eyes} />
                </h5>
              </div>
              <div className={styles.card_button}>
                <Link to={"/vacancy-detail/" + elem?.id} className={styles.btn_link}>
                  Подробнее
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.available}>
            <div className={styles.available_img_wrap}>
              <img alt="img-available" src="/vacancies.svg" className={styles.available_img} />
            </div>
            <div className={styles.available_desc}>
              <p className={styles.available_text}>Добавьте вакансию</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesEmployee;
