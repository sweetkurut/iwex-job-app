import React from "react";
import styles from "./vacancies.module.sass";

const MyVacancies = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Вакансии</h1>
        <div className={styles.cards}>
          <div className={styles.card}></div>
        </div>
      </div>
    </div>
  );
};

export default MyVacancies;
