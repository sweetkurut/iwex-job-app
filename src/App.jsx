import { useLocation } from "react-router-dom";
import "./App.css";
// import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

const App = () => {
  const navigate = useLocation();

  return (
    <>
      <Main />
      {/* {navigate.pathname !== "/login" && <Footer />} */}
    </>
  );
};

export default App;
