import React from "react";
import s from "./Profile.module.sass";
import { useSelector } from "react-redux";
import Company from "./components/company/Company";
import Branch from "./components/branch/Branch";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Profile = () => {
  const { isLoading } = useSelector((state) => state.companyDetails);
  const [component, setComponent] = useState("company");

  const renderSignComponent = () => {
    switch (component) {
      case "company":
        return <Company setComponent={setComponent} />;
      case "branch":
        return <Branch setComponent={setComponent} />;
      case "editCompany":
        return <EditCompany setComponent={setComponent} />;
      default:
        return null;
    }
  };
  const activeComponent = (component) => {
    setComponent(component);
  };
  return (
    <div className={s.container}>
      <p className={s.title}>Профиль</p>
      <ul className={s.ul}>
        <li
          onClick={() => activeComponent("company")}
          className={component === "company" ? s.active : ""}>
          Данные о компании
        </li>
        <li
          onClick={() => activeComponent("branch")}
          className={component === "branch" ? s.active : ""}>
          Филиалы
        </li>
      </ul>

      {isLoading && (
        <Box className={s.loading} sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <div style={{ opacity: isLoading ? 0.3 : 1 }}>{renderSignComponent()}</div>
    </div>
  );
};

export default Profile;
