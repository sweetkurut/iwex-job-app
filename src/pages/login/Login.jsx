import { useState } from "react";
import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";
import ConfirmEmail from "../../components/confirmEmail/ConfirmEmail";
import EnterPassword from "../../components/enterPassword/EnterPassword";
import s from "./Login.module.sass";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import ResetPassword from "../../components/resetPassword/ResetPassword";

const Login = () => {
  const [component, setComponent] = useState("SignIn");
  const [email, setEmail] = useState("");
  const { isLoading } = useSelector((state) => state.user);

  const renderSignComponent = () => {
    switch (component) {
      case "SignIn":
        return <SignIn setComponent={setComponent} />;
      case "SignUp":
        return <SignUp setComponent={setComponent} setEmail={setEmail} />;
      case "confirmEmail":
        return <ConfirmEmail setComponent={setComponent} email={email} />;
      case "enterPassword":
        return <EnterPassword setComponent={setComponent} email={email} />;
      case "resetPassword":
        return <ResetPassword setComponent={setComponent} email={email} />;
      default:
        return null;
    }
  };

  return (
    <div className={s.main}>
      <div className={`${s.box} ${isLoading && s.loading}`}>
        {isLoading && <LinearProgress />}
        {renderSignComponent()}
      </div>
    </div>
  );
};

export default Login;
