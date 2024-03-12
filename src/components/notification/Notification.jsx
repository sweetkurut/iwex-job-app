import React, { useState, useEffect, useRef } from 'react';
import s from './Notification.module.sass';

const Notification_interviews = ({ e, handlerRead }) => {
    return (
        <button style={{ background: e?.read ? '#d1d7d836' : '#008eb136' }} onClick={() => handlerRead(e?.id)} key={e?.id} className={s.card}>
            <p className={s.message}>{e?.message?.notification}</p>
            <p className={s.email}>от: <span>{e?.message?.employer}</span></p>
            <p className={s.date}>{e?.notification_date}</p>
        </button>
    );
};


const Notification_vacancy = ({ e, handlerRead }) => {
    return (
        <button style={{ background: e?.read ? '#d1d7d836' : '#008eb136' }} onClick={() => handlerRead(e?.id)} key={e?.id} className={s.card}>
            <p className={s.message}>{e?.message?.notification}</p>
            <p className={s.email}>от: <span>{e?.message?.employer}</span></p>
            <p className={s.date}>{e?.notification_date}</p>
        </button>
    );
};




const Notification = ({ isOpen, onClose, setUnread_count }) => {
    const notificationRef = useRef(null);
    const [data, setData] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        function connectWebSocket() {
            // const newSocket = new WebSocket('ws://10.137.60.134:8003/ws/notify/');
            // const newSocket = new WebSocket('ws://10.137.60.134:8003/ws/notifications/');
            const newSocket = new WebSocket('ws://192.168.0.90:8001/ws/interviews/');

            newSocket.onopen = () => {
                console.log('WebSocket соединение установлено.');
            };

            newSocket.onclose = () => {
                console.log('WebSocket соединение закрыто.');
                setTimeout(connectWebSocket, 3000);
            };

            newSocket.onmessage = (event) => {
                const newData = JSON.parse(event.data);
                setData(prevData => {
                    const index = prevData.findIndex(item => item.id === newData.id);
                    if (index !== -1) {
                        return prevData.map(item => (item.id === newData.id ? newData : item));
                    } else {
                        return prevData.concat(newData);
                    }
                });
                setUnread_count(newData.unread_count);
                console.log(newData);
            };

            setSocket(newSocket);
        }

        connectWebSocket();

        return () => {
            console.log('WebSocket соединение закрыто.');
            if (socket) {
                socket.close();
            }
        };
    }, []);


    const handlerRead = (id) => {
        const data = {
            id: id,
        };
        socket.send(JSON.stringify(data));
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
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
                        <Notification_interviews e={e} handlerRead={handlerRead} />
                    ) : e?.type_notification === 'vacancy_notification' ? (
                        <Notification_vacancy e={e} handlerRead={handlerRead} />
                    )
                        // : e?.type_notification === 'message_notification' ? (
                        //     <NotificationButton e={e} handlerRead={handlerRead} />
                        // ) 
                        : null
                ))}
            </div>
        </div>
    );
};

export default Notification;
