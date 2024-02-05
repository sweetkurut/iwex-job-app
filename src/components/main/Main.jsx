import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Login from '../../pages/login/Login';
const Main = () => {
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