import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import Vacancies from "../../pages/vacancies/vacancies";
import PrivacyPolicyPage from "../../pages/privacypolicy/privacypolicy";
import PageResponse from "../../pages/response/response";
import Branch from "../../pages/branch/branch";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/response" element={<PageResponse />} />
        <Route path="/branch" element={<Branch />} />
      </Routes>
    </main>
  );
};

export default Main;
