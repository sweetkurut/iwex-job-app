import React from "react";
import s from './Orders.module.sass'
import { IoIosWarning } from "react-icons/io";
const Orders = () => {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div>
          <div>
            <h2 className={s.title}>Выполненные задачи</h2>
            <p className={s.number}>0</p>
          </div>
          <span></span>
          <div className={s.bottom_number}>
            <p>0</p>
            <h2>За неделю</h2>
          </div>
        </div>
        <div>
          <div>
            <h2 className={s.title}>Просроченные задачи</h2>
            <p className={s.number}>0</p>
          </div>
          <span></span>
          <div className={s.bottom_number}>
            <p>0</p>
            <h2>За неделю</h2>
          </div>
        </div>
      </div>
      <div className={s.card}>
        <div>
          <h2 className={s.title}>Источник сделок</h2>
          <p className={s.error}><IoIosWarning size={25} />  Недостаточно данных для отображения</p>
        </div>
      </div>
      <div className={s.card}>
        <div>
          <h2 className={s.title}>Сделки с работодателями</h2>
          <p className={s.number}>0</p>
        </div>
        <div className={s.bottom_number}>
          <p>0</p>
          <h2>Всего сделок</h2>
        </div>

      </div>
    </div>
  );
};

export default Orders;
