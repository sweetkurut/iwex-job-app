import React, { useEffect, useState } from 'react';
import s from './ChatPage.module.sass';
import { Fade, Menu, MenuItem } from '@mui/material';
import { IoMdMore } from "react-icons/io";
import { getCookie } from '../../utils/js_cookie';

const ChatPage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState([]);
    const [socket, setSocket] = useState(null);
    const token = getCookie("accessToken");
    const [messages, setMessages] = useState([
        { id: 1, text: "Привет!", isMine: true },
        { id: 2, text: "Привет, как дела?", isMine: false }
    ]);
    const [newMessage, setNewMessage] = useState("");

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

    const handleMessageSend = () => {
        if (newMessage.trim() !== "") {
            const newId = messages.length + 1;
            setMessages([...messages, { id: newId, text: newMessage, isMine: true }]);
            setNewMessage("");
        }
    };



    useEffect(() => {
        function connectWebSocket() {
            // const newSocket = new WebSocket(`ws://192.168.0.90:8001/ws/chat/${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyOTc4ODU1LCJpYXQiOjE3MTAzODY4NTUsImp0aSI6IjgzYTMxYWI3MDFlNTQ2MzliODBiNTE0MWI4ZGIwNmVmIiwidXNlcl9pZCI6MX0.f-mFBrd3RkhhvgcezqutjCAA1JMHOxFpHtxdJo24EYQ'}/`);
            const newSocket = new WebSocket(`ws://10.137.60.134:8001/ws/chat/${'iwex'}/1/`);

            newSocket.onopen = () => {
                console.log('WebSocket соединение установлено.');
            };

            newSocket.onclose = () => {
                console.log('WebSocket соединение закрыто.');
                // setTimeout(connectWebSocket, 3000);
            };

            newSocket.onmessage = (event) => {
                const newData = JSON.parse(event.data);
                // setData(prevData => {
                //     const index = prevData.findIndex(item => item.id === newData.id);
                //     if (index !== -1) {
                //         return prevData.map(item => (item.id === newData.id ? newData : item));
                //     } else {
                //         return prevData.concat(newData);
                //     }
                // });
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

    return (
        <div className={s.container}>
            <div className={s.rooms}>
                {
                    Array(10).fill().map((_, index) => (
                        <div className={s.room} key={index}>
                            <button className={s.name}>Друг</button>
                            <button
                                onClick={(event) => handleClick(event, index)}>
                                <IoMdMore size={25} />
                            </button>
                            <Menu
                                className={s.menu}
                                id={`fade-menu-${index}`}
                                MenuListProps={{
                                    "aria-labelledby": `fade-button-${index}`,
                                }}
                                anchorEl={anchorEl}
                                open={selectedId === index}
                                onClose={handleClose}
                                TransitionComponent={Fade}>
                                <MenuItem className={s.profile_menu}>
                                    Закрепить
                                </MenuItem>
                                <MenuItem className={s.logOut}>
                                    Удалить
                                </MenuItem>
                            </Menu>
                        </div>
                    ))
                }
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {messages.map((message) => (
                        <div
                            className={`${s.message} ${message.isMine ? s.myMessage : s.otherMessage}`}
                            key={message.id}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className={s.inputContainer}>
                    <input
                        type="text"
                        className={s.input}
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className={s.sendButton} onClick={handleMessageSend}>
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
