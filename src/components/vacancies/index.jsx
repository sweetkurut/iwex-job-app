import React, { useState } from "react";
import styles from "./vacancies.module.sass";
import Cards from "./components/Cards";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendHousinng } from "../../store/slices/companyDetailsSlice";
import ModalWarning from "../modalWarning/ModalWarning";

const MyVacancies = () => {
  const navigation = useNavigate();

  const { detailCompany } = useSelector(state => state.companyDetails)
  const [modalMessage, setModalMessage] = useState(false);

  const handlerComponent = () => {
    if (Object.keys(detailCompany).length > 0) {
      navigation('/vacancy')
    } else {
      const message = {
        title: 'Предупреждение',
        text: 'Вам нужно заполнить данные о компании',
      }
      setModalMessage(message)
    }
  };


  return (
    <>
      <ModalWarning modalMessage={modalMessage} />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Вакансии</h1>
          <button onClick={handlerComponent} className={styles.btn}>
            Добавить вакансию
          </button>
          <Cards />
        </div>
      </div>
    </>
  );
};

export default MyVacancies;
