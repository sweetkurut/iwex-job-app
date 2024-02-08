import Home from "../../pages/home/Home";
import Vacancies from "../../pages/vacancies/vacancies";
import PageResponse from "../../pages/response/response";
import Branch from "../../pages/branch/branch";
import PageDetailVacancies from "../../pages/detailvacancies";
import PagePrivacy from "../../pages/privacypolicy/privacy";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from '../../utils/js_cookie';
import { useNavigate } from 'react-router-dom';
import Profile from "../../pages/profile/Profile";
import { getDataProfile } from "../../store/slices/companyDetailsSlice";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getCookie('accessToken');

    useEffect(() => {

        if (!token) {
            navigate('/login');
        } else {
            // navigate('/vacancies');
            dispatch(getDataProfile())
        }

    }, [token]);

    return (
        <main>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/privacy" element={<PagePrivacy />} />
                <Route path="/response" element={<PageResponse />} />
                <Route path="/branch" element={<Branch />} />
                <Route path="/card-detail-vacancies" element={<PageDetailVacancies />} />
                {/* Add a catch-all route to redirect to home or handle not found pages */}
                <Route path="/*" element={<Home />} />
            </Routes>
        </main>
    );
};

export default Main;
