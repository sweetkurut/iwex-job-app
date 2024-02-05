import React from "react";
import styles from "./vacancies.module.sass";
import Cards from "./components/Cards";

const MyVacancies = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Вакансии</h1>
        <Cards />
      </div>
    </div>
  );
};

export default MyVacancies;
