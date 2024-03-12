import styles from "./staff.module.sass";
import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";

const InterviewStaffComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Box sx={{ width: "100%", typography: "body1" }} className={styles.box_container}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Вакансия" value={0} />
                <Tab label="Все студенты" value={1} />
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default InterviewStaffComponent;
