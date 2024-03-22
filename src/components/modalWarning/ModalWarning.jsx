import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
`;

const slideOut = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
`;

const Wrapper = styled.div`
    position: fixed;
    width:330px;
    height:100%;
    top: 0;
    right: 0;
    z-index: 1400;
`;

const ErrorCard = styled.div`
    padding: 15px;
    margin-bottom: 10px;
    color:#FFF;
    animation: ${slideIn} 0.5s ease;

    &:last-child {
        animation: ${slideOut} 0.5s ease forwards;
    }
`;

const ModalWarning = ({ modalMessage }) => {
    const [errors, setErrors] = useState([]);

    const addError = () => {
        const newError = { id: Date.now(), title: `${modalMessage.title}`, text: `${modalMessage.text}` };
        setErrors([newError, ...errors]);
        setTimeout(() => {
            setErrors(errors => errors.filter(e => e.id !== newError.id));
        }, 3000);
    };
    useEffect(() => {
        modalMessage.title && addError();

    }, [modalMessage]);
    return (
        <Wrapper >
            {errors.map((e, index) => (
                <ErrorCard key={e.id} style={{ background: modalMessage.title === 'Успех' ? 'green' : 'orange' }}>
                    <p style={{ marginBottom: 5 }}>{e.title}</p>
                    <p>{e.text}</p>
                </ErrorCard>
            ))}
        </Wrapper>
    );
};

export default ModalWarning;
