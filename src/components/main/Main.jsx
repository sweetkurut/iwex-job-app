import Home from "../../pages/home/Home";
import Vacancies from "../../pages/vacancies/vacancies";
import PageResponse from "../../pages/response/response";
import Branch from "../../pages/branch/branch";
import PageDetailVacancies from "../../pages/detailvacancies";
import PagePrivacy from "../../pages/privacypolicy/privacy";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/js_cookie";
import { useNavigate } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import { getDataProfile } from "../../store/slices/companyDetailsSlice";
import Page404 from "../../pages/404/404";
import EditVacancyPage from "../../pages/editVacancies/edit";
import AddVacancy from "../vacancies/components/addVacancy/AddVacancy";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = getCookie("accessToken");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            // navigate('/vacancies');
            dispatch(getDataProfile());
        }
    }, [token]);

    return (
        <main>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/add-vacancy" element={<AddVacancy />} />
                <Route path="/privacy" element={<PagePrivacy />} />
                <Route path="/response" element={<PageResponse />} />
                <Route path="/branch" element={<Branch />} />
                <Route path="/card-detail-vacancies/:id" element={<PageDetailVacancies />} />
                <Route path="/edit-detail-vacancy/:id" element={<EditVacancyPage />} />
                <Route path="*" element={<Page404 />} />
                {/* Add a catch-all route to redirect to home or handle not found pages */}
                <Route path="/*" element={<Home />} />
            </Routes>
        </main>
    );
};

export default Main;
