import styles from "./staff.module.sass";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewList } from "../../store/slices/employeeDetailsSlice";
import { useLocation, useParams } from "react-router";

const InterviewStaffComponent = () => {
  const { id } = useParams();
  let { state } = useLocation();
  const [value, setValue] = useState("1");

  const dispatch = useDispatch();
  const { interview } = useSelector((state) => state.employeeDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getInterviewList());
  }, [dispatch]);
  console.log(interview);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default InterviewStaffComponent;
