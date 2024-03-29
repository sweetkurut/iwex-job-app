import React, { useState, useEffect, useRef } from 'react';
import s from './Notification.module.sass';
import { getCookie } from '../../utils/js_cookie';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Notification_interviews = ({ e, handlerRead, id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate('/interview-staff/' + id)
        handlerRead(e?.id)
      }}
      key={e?.id}
      className={`${s.card} ${e?.read && s.active}`}>
      <p className={s.message}>{e?.message?.notification}</p>
      <p className={s.email}>
        от: <span>{e?.message?.employer}</span>
      </p>
      <p className={s.date}>{e?.notification_date}</p>
    </button>
  );
};

const Notification_vacancy = ({ e, handlerRead, id }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        handlerRead(e?.id)
        navigate(`/vacancy-detail/` + id)
      }} key={e?.id}
      className={`${s.card} ${e?.read && s.active}`}>

      <p className={s.message}>{e?.message?.notification}</p>
      <p className={s.email}>от: <span>{e?.message?.employer}</span></p>
      <p className={s.email}>филиал: <span>{e?.message?.branch}</span></p>
      <p className={s.email}>требуется студентов: <span>{e?.message?.employee_count}</span></p>
      <p className={s.date}>{e?.notification_date}</p>
    </button>
  );
};

const TypeNotification_vacancy = ({ e, handlerRead }) => {
  return (
    <button
      style={{ background: e?.read ? "#d1d7d836" : "#008eb136" }}
      onClick={() => handlerRead(e?.id)}
      key={e?.id}
      className={s.card}>
      <p className={s.message}>{e?.message?.notification}</p>
      <p className={s.email}>
        от: <span>{e?.message?.employer}</span>
      </p>
      <p className={s.date}>{e?.notification_date}</p>
    </button>
  );
};

const Notification = ({ isOpen, onClose, setUnread_count }) => {
  const { role } = useSelector((state) => state.user);

  const notificationRef = useRef(null);
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    function connectWebSocket() {
      const newSocket = new WebSocket('wss://backcrm.iwex.kg/ws/interviews/');

      newSocket.onopen = () => {
        console.log("WebSocket соединение установлено.");
      };

      newSocket.onclose = () => {
        console.log("WebSocket соединение закрыто.");
        // setTimeout(connectWebSocket, 3000);
      };


      if (role === 'is_employee') {
        newSocket.onmessage = (event) => {
          const newData = JSON.parse(event.data);
          console.log(newData);
          setData(prevData => {
            const index = prevData.findIndex(item => item.id === newData.id);
            if (index !== -1) {
              return prevData.map(item => (item.id === newData.id ? newData : item));
            } else {
              return prevData.concat(newData);
            }
          });
          setUnread_count(newData.unread_count);
        }
      };

      setSocket(newSocket);
    }

    connectWebSocket();

    return () => {
      console.log("WebSocket соединение закрыто.");
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handlerRead = (id) => {
    const sendData = {
      id: id,
    };
    socket.send(JSON.stringify(sendData));
  };


  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      onClose();
    }
  };
  console.log(data);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={notificationRef} className={`${s.notifications} ${isOpen ? s.open : ''}`}>
      <div className={s.header}>
        <p>Уведомления</p>
      </div>
      <div className={s.wrapper}>
        {data?.map(e => (
          e?.type_notification === 'interviews_notification' ? (
            <Notification_interviews key={e?.id} e={e} handlerRead={handlerRead} id={e?.message?.vacancy_id} />
          ) : e?.type_notification === 'vacancy_notification' ? (
            <Notification_vacancy key={e.id} e={e} handlerRead={handlerRead} id={e?.message?.vacancy_id} />
          )
            : null
        ))}
      </div>
    </div>
  );
};

export default Notification;
