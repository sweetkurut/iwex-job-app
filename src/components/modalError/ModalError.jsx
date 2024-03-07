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
    z-index: 90;
`;

const ErrorCard = styled.div`
    background-color: orange;
    padding: 15px;
    margin-bottom: 10px;
    color:#FFF;
    animation: ${slideIn} 0.5s ease;

    &:last-child {
        animation: ${slideOut} 0.5s ease forwards;
    }
`;

const ModalError = () => {
    const [errors, setErrors] = useState([]);

    const addError = () => {
        const newError = { id: Date.now(), text: 'Новая ошибка' };
        setErrors([newError, ...errors]);
        setTimeout(() => {
            setErrors(errors => errors.filter(e => e.id !== newError.id));
        }, 3000);
    };

    return (
        <Wrapper>
            <button onClick={addError}>добавить ошибку</button>
            {errors.map((e, index) => (
                <ErrorCard key={e.id}>{e.text}</ErrorCard>
            ))}
        </Wrapper>
    );
};

export default ModalError;
