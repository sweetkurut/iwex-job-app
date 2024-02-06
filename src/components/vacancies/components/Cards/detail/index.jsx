import React from "react";
import styles from "./detail.module.sass";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const CardDetail = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link color="inherit" to="/">
              Главная
            </Link>
            <Link to="/vacancies">Мои вакансии</Link>
            <Typography color="text.primary" className={styles.typography}>
              Подробная информация
            </Typography>
          </Breadcrumbs>
          <h2 className={styles.name_vacancies}>Web-разработчик</h2>
        </div>
        <div className={styles.card}>
          <div className={styles.card_data_titles}>
            <h3 className={styles.card_data}>Зарплата: 150 000сом</h3>
            <h3 className={styles.card_data}>Стаж работы: от 2х лет</h3>
            <h3 className={styles.card_data}>Город: Бишкек</h3>
            <h3 className={styles.card_data}>Филиал: soft_development</h3>
            <h3 className={styles.card_data}>Адрес места работы: ул.Горького 12/1</h3>
            <h3 className={styles.card_data}>Дресс-Код: свободная</h3>
            <h3 className={styles.card_data}>Начало времени работы: 08:00</h3>
            <h3 className={styles.card_data}>Конец времени работы: 18:000</h3>
          </div>
          <div className={styles.card_data_desc}>
            <h3 className={styles.trebovanya}>
              Требования работадателя:
              <span>Приходить на работу во время, активно помогать джунам</span>
            </h3>
          </div>
          <div className={styles.responsibilities}>
            <h3 className={styles.responsibilities_title}>
              Обязанности:
              <li>
                <span className={styles.responsibilities_desc}>
                  Создает программу сайтов и структурирует их. Настраивает работу с сервером и
                  корректирует данные. Делает верстку сайта, отлаживает его интерфейс. Тестирует
                  фронтенд- и бэкенд-части. Реализует требования по дизайну. Поддерживает
                  стабильность работы веб-ресурса.
                </span>
              </li>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
