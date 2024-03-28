import { useEffect, useRef } from "react";
import s from './modal.module.sass';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, data_interview }) => {
  const ModalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (ModalRef.current && !ModalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`${s.bg} ${isOpen && s.bgOpen}`}>
      <div ref={ModalRef} className={`${s.modal} ${isOpen && s.active} `}>
        <div className={s.header}>
          <p>Список студентов на собеседования</p>
        </div>
        <div className={s.wrapper}>
        </div>
        <div className={s.card}>
          <h2 className={s.vacancy}>Данные о вакансии</h2>
          <ul className={s.card_vacancy_desc}>
            <li>Позиция: {data_interview?.vacancy_review?.position}</li>
            <li>Филиал: {data_interview?.vacancy_review?.branch}</li>
            <li>Город: {data_interview?.vacancy_review?.branch_city}</li>
            <li>Адресс: {data_interview?.vacancy_review?.branch_address}</li>
            <li>Кол-во работников: {data_interview?.vacancy_review?.employee_count}</li>
            <li>Опыт работы: {data_interview?.vacancy_review?.experience}</li>
            <li>Зарплата: {data_interview?.vacancy_review?.salary}</li>
            <li>Начало работы: {data_interview?.vacancy_review?.time_start}</li>
            <li>Конец работы: {data_interview?.vacancy_review?.time_end}</li>
          </ul>
          <h2 className={s.student}>Cтуденты</h2>
          <div className={s.card_student_desc}>
            {data_interview?.users?.map((item) => (
              <div key={item.id} className={s.student_card}>
                <div className={s.desc}>
                  <Avatar
                    src={item?.profile_photo}
                    alt="student_icon"
                    sx={{
                      width: "50px",
                      height: "50px",
                    }}></Avatar>
                  <div>
                    <h5>Имя: {item.first_name}</h5>
                    <h5>Фамилия: {item.last_name}</h5>
                  </div>
                </div>
                <Link className={s.btn} to={`/student-detail/${item.id}`} state={{ interview_active: true }}>Подробнее</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Modal;

