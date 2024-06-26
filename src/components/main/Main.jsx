import Vacancies from "../../pages/vacancies/vacancies";
import PageResponse from "../../pages/response/response";
import PageDetailVacancies from "../../pages/detailvacancies";
import PagePrivacy from "../../pages/privacypolicy/privacy";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/js_cookie";
import { useNavigate } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import { getCompanyData, getDataProfile } from "../../store/slices/companyDetailsSlice";
import Page404 from "../../pages/404/404";
import EditVacancyPage from "../../pages/editVacancies/edit";
import StudentPage from "../../pages/students/students";
import Detail from "../../pages/detail-students/detail";
import AddVacancy from "../vacancies/components/addVacancy/AddVacancy";
import FavoritesPage from "../../pages/favorites/Favorites";
import PageInterviews from "../../pages/interviews/interviews";
import { sendToken, setRole } from "../../store/slices/userSlice";
import Orders from "../../pages/orders/Orders";
import Header_Employee from "../header/Header_Employee";
import Header from "../header/Header";
import Employer from "../../pages/employer/emloyee";
import ListStudentsPage from "../../pages/ListStudents/listStudentsPage";
import ChatPage from "../../pages/chatPage/ChatPage";
import Interviewstaff from "../../pages/interviewStaff/interviewstaff";
import StaffDetailProfiles from "../../pages/staff-detail-profiles/staffDetailProfiles";
import Vacancy_isemployee from "../../pages/vacancy_isemployee/vacancy_isemployee";
import Vacancy_Detail_Staff from "../../pages/vacancy_isEmployee_detail/vacancy_detail_staff";
import Briefing from "../Briefing/Briefing";
import EmployerComponentById from "../Employer/detail";

const Main = () => {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(sendToken(token));
    }
  }, [token]);

  useEffect(() => {
    if (role === "is_employer") {
      dispatch(getDataProfile());
      dispatch(getCompanyData());
    }
  }, [role]);
  return (
    <>
      {role === "is_employer" && <Briefing />}
      {navigate.pathname !== "/login" && navigate.pathname !== "*" && role === "is_employer" ? (
        <Header />
      ) : (
        role === "is_employee" && <Header_Employee />
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message" element={<ChatPage />} />
          {role === "is_employee" ? (
            <>
              <Route path="/*" element={<Orders />} />
              <Route path="/vacancies-list" element={<Vacancy_isemployee />} />
              <Route path="/vacancy-detail/:id" element={<Vacancy_Detail_Staff />} />
              <Route path="/list-employer" element={<Employer />} />
              <Route path="/list-employerById/:id" element={<EmployerComponentById />} />
              <Route path="/list-students" element={<ListStudentsPage />} />
              <Route path="/list-students-byID/:id" element={<StaffDetailProfiles />} />
              <Route path="/student-detail/:id" element={<Detail />} />
              <Route path="/interview-staff/:id" element={<Interviewstaff />} />
              <Route path="*" element={<Page404 />} />
            </>
          ) : role === "is_employer" ? (
            <>
              <Route path="/*" element={<Vacancies />} />
              <Route path="/privacy" element={<PagePrivacy />} />
              <Route path="/vacancy" element={<AddVacancy />} />
              <Route path="/response" element={<PageResponse />} />
              <Route path="/card-detail-vacancies/:id" element={<PageDetailVacancies />} />
              <Route path="/edit-detail-vacancy/:id" element={<EditVacancyPage />} />
              <Route path="/students" element={<StudentPage />} />
              <Route path="/student-detail/:id" element={<Detail />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/list-interviews" element={<PageInterviews />} />
              <Route path="*" element={<Page404 />} />
            </>
          ) : (
            <Route path="*" element={<Page404 />} />
          )}
        </Routes>
      </main>
    </>
  );
};

export default Main;
