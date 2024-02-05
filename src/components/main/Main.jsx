import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
const Main = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </main >
    )
}

export default Main