import React, { useState, useEffect, useRef } from 'react';
import styles from './Notification.module.sass';

const Notification = ({ isOpen, onClose }) => {
    const notificationRef = useRef(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://192.168.0.90:8001/ws/interviews/');

        ws.onopen = () => {
            console.log('WebSocket соединение установлено.');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setData(message)
        };
        ws.onclose = () => {
            console.log('WebSocket соединение закрыто.');
        };


        return () => {
            console.error('Произошла ошибка:', event);
            ws.close();
        };
    }, []);

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
        <div ref={notificationRef} className={`${styles.notifications} ${isOpen ? styles.open : ''}`}>
            <h2 style={{ fontSize: 20, color: 'green', paddingTop: 10 }}>{data?.message?.notification}</h2>

        </div>
    );
};

export default Notification;



