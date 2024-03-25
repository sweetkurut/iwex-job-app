import { Avatar } from "@mui/material";
import styles from "./employer.module.sass";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEmployerCompany } from "../../store/slices/companyDetailsSlice";

const EmployerComponent = () => {
  const openNewWindow = () => {
    const url = "https://crm.iwex.kg/admin/core/employercompany/add/?_to_field=id&_popup=1";
    const windowFeatures = "width=700,height=950,resizable=yes,scrollbars=yes,status=yes";
    window.open(url, "_blank", windowFeatures);
  };

  const dispatch = useDispatch();
  const { staffEmployer } = useSelector((state) => state.companyDetails);

  useEffect(() => {
    dispatch(getAllEmployerCompany());
  }, [dispatch]);

  console.log(staffEmployer);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Список Работодателей</h2>
        <button onClick={openNewWindow} className={styles.btn}>
          Добавить работадателя
        </button>
        <div className={styles.cards}>
          {Array.isArray(staffEmployer) &&
            staffEmployer.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.card} key={item.id}>
                <div className={styles.vacancies_name_image}>
                  <div className={styles.profile_image}>
                    <Avatar
                      alt="icon-company"
                      src={item?.icon}
                      sx={{ width: 85, height: 85 }}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.last_first_name}>
                    <h3 className={styles.name}>{item.first_name}</h3>
                    <h3 className={styles.name}>{item.last_name}</h3>
                  </div>
                </div>
                <div className={styles.card_descriptions}>
                  <h3 className={styles.user_data}>Личные данные:</h3>
                  <h5 className={styles.name_company}> Компания: {item.name} </h5>
                  <h5 className={styles.name_position}> Позиция: {item.position} </h5>
                  <div className={styles.number}>
                    <span className={styles.phone_num}>Контакты: {item.contact_info}</span>
                  </div>
                  <div className={styles.number}>
                    <span className={styles.phone_num}>Контактное лицо: {item.contact_person}</span>
                  </div>
                  <div className={styles.number}>
                    <span className={styles.phone_num}>
                      Реквизиты компании: {item.payment_info}
                    </span>
                  </div>
                </div>
                <div className={styles.card_button}>
                  <Link to={"/interview-staff/" + item.id} className={styles.btn_link}>
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerComponent;
