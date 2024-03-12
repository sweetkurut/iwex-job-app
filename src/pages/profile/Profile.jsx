import s from "./Profile.module.sass";
import { useSelector } from "react-redux";
import Company from "./components/company/Company";
import Branch from "./components/branch/Branch";
import { useState } from "react";
import { CircularProgress, Tab } from "@mui/material";
import { Box } from "@mui/system";
import { TabContext, TabList } from "@mui/lab";

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
  const activeComponent = (e, component) => {
    setComponent(component);
  };
  return (
    <div className={s.container}>
      <p className={s.title}>Профиль</p>

      <Box sx={{ width: "100%", marginBottom: 5 }}>
        <TabContext value={component}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={activeComponent} aria-label="lab API tabs example">
              <Tab label="Данные о компании" value="company" />
              <Tab label="Филиалы" value="branch" />
              <Tab label="Жильё" value="housing" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
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
