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
import { getCookie } from "../../utils/js_cookie";
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      <Navigate to="/" />;
    }
  }, [dispatch]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/privacy" element={<PagePrivacy />} />
        <Route path="/response" element={<PageResponse />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/card-detail-vacancies" element={<PageDetailVacancies />} />
      </Routes>
    </main>
  );
};

export default Main;
