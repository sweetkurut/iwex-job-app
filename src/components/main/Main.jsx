import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from '../../utils/js_cookie';
const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token) {
            <Navigate to="/" />
        }
    }, [dispatch]);


    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='login' element={<Login />} />
            </Routes>
        </main >
    )
}

export default Main