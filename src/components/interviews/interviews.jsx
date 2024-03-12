import styles from "./interview.module.sass";
import {
  Scheduler,
  MonthView,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useEffect, useState } from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewList } from "../../store/slices/employeeDetailsSlice";

const Interview = () => {
  const { interview } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    dispatch(getInterviewList());
  }, [dispatch]);

  useEffect(() => {
    console.log(interview);
    if (interview && interview.length > 0) {
      const newAppointments = interview.map((interviewItem) => {
        console.log(interviewItem.interviews_date);
        const dateParts = interviewItem.interviews_date.split(",");

        const startDate = new Date(
          parseInt(dateParts[0]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[2]),
          parseInt(dateParts[3]),
          parseInt(dateParts[4])
        );

        // const student = interviewItem.user_profile.first_name;

        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1);

        return {
          // title: interviewItem.vacancy_review.employer_company_name,
          title: interviewItem.vacancy_review.position,
          // student: student,
          startDate: startDate,
          endDate: endDate,
        };
      });
      setAppointments(newAppointments);
    }
  }, [interview]);

  console.log(appointments);
  return (
    <div className={styles.container}>
      <Scheduler data={appointments}>
        <ViewState />
        <MonthView />
        <Appointments />
        <Toolbar />
        <DateNavigator currentDate={selectedDate} onCurrentDateChange={setSelectedDate} />
        <AppointmentTooltip />
      </Scheduler>
    </div>
  );
};

export default Interview;
