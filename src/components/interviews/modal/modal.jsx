/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import styles from "./modal.module.sass";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Modal = ({ onClose, appointment, data_interview }) => {
  console.log(data_interview);
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.card}>
          <h2 className={styles.vacancy}>Данные о вакансии</h2>
          <div className={styles.card_vacancy_desc}>
            <h5>Позиция: {data_interview?.vacancy_review?.position}</h5>
            <h5>Филиал: {data_interview?.vacancy_review?.branch}</h5>
            <h5>Город: {data_interview?.vacancy_review?.branch_city}</h5>
            <h5>Адресс: {data_interview?.vacancy_review?.branch_address}</h5>
            <h5>Кол-во работников: {data_interview?.vacancy_review?.employee_count}</h5>
            <h5>Опыт работы: {data_interview?.vacancy_review?.experience}</h5>
            <h5>Зарплата: {data_interview?.vacancy_review?.salary}</h5>
            <h5>Начало работы: {data_interview?.vacancy_review?.time_start}</h5>
            <h5>Конец работы: {data_interview?.vacancy_review?.time_end}</h5>
          </div>
          <h2 className={styles.student}>Данные о студенте</h2>
          <div className={styles.card_student_desc}>
            {data_interview?.users?.map((item) => (
              <div key={item.id} className={styles.student_card}>
                <Avatar
                  src={item?.profile_photo}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "20px",
                  }}
                  alt="student_icon"
                  sx={{
                    width: "100px",
                    height: "100px",
                  }}></Avatar>
                <div className={styles.desc}>
                  <h5>Имя: {item.first_name}</h5>
                  <h5>Фамилия: {item.last_name}</h5>
                  <Link to={"/student-detail/" + item.id} className={styles.btn}>
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <IoMdClose className={styles.close} onClick={onClose} />
    </div>
  );
};

export default Modal;
