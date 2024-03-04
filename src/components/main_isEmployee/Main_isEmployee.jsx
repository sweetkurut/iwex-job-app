import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils/js_cookie";
import { useNavigate } from "react-router-dom";
import { getDataProfile } from "../../store/slices/companyDetailsSlice";
import Orders from "../../pages/orders/Orders";

const Main_isEmployee = () => {
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
        <Route path="/*" element={<Orders />} />
      </Routes>
    </main>
  );
};

export default Main_isEmployee;
