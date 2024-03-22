import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "./staff.module.sass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewList } from "../../store/slices/employeeDetailsSlice";

const InterviewStaffComponent = () => {
  const { interview } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();

  console.log(interview);

  useEffect(() => {
    dispatch(getInterviewList());
  }, [dispatch]);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Вакансия" value="1" />
                <Tab label="Отклики" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">Вакансия</TabPanel>
            <TabPanel value="2">Отклики</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default InterviewStaffComponent;
