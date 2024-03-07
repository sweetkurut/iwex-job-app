import React, { useState } from 'react';
import s from './ChatPage.module.sass';
import { Fade, Menu, MenuItem } from '@mui/material';
import { IoMdMore } from "react-icons/io";

const ChatPage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
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
