import React, { useState } from "react";
import styles from "./vacancies.module.sass";
import Cards from "./components/Cards";
import { Link } from "react-router-dom";

const MyVacancies = () => {


  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Вакансии</h1>
        <Link to="/vacancy" className={styles.btn}>
          Добавить вакансию
        </Link>
        <Cards />
      </div>
    </div>
  );
};

export default MyVacancies;
