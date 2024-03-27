/* eslint-disable no-undef */
import { useState } from "react";
import styles from "./interview.module.sass";
import { useEffect } from "react";
import { EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import {
  MonthView,
  Appointments,
  Scheduler,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useDispatch, useSelector } from "react-redux";
import { getInterview } from "../../store/slices/employeeDetailsSlice";
import Modal from "./modal/modal";
import { Button } from "@mui/material";

const Interview = () => {
  const { interview } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [data, setData] = useState(interview);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let updatedData = [...prevData];
      if (added) {
        const startingAddedId = prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 0;
        updatedData = [...prevData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        updatedData = updatedData.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        updatedData = updatedData.filter((appointment) => appointment.id !== deleted);
      }
      return updatedData;
    });
  };

  useEffect(() => {
    dispatch(getInterview());
  }, [dispatch]);

  useEffect(() => {
    if (interview && interview.length > 0) {
      const newAppointments = interview.map((interviewItem) => {
        const dateParts = interviewItem.interviews_date.split(",");
        const vacancy_name = interviewItem.vacancy_review.employer_company_name;
        const data_create = interviewItem.vacancy_review.created_date;

        const startDate = new Date(
          parseInt(dateParts[0]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[2]),
          parseInt(dateParts[3]),
          parseInt(dateParts[4])
        );
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1);
        return {
          title: interviewItem.vacancy_review.position,
          vacancy_name: vacancy_name,
          startDate: startDate,
          data_create: data_create,
          endDate: endDate,
        };
      });
      setAppointments(newAppointments);
    }
  }, [interview]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const data_interview = { ...interview[0] };

  const TooltipContent = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      {children}
      <li className={styles.vacancies_name}>{appointmentData.vacancy_name}</li>
      <li className={styles.vacancies_create_date}>{appointmentData.data_create}</li>

      <Button
        onClick={() => {
          closeModal();
          openModal(appointmentData);
        }}
        className={styles.btn}>
        Подробнее
      </Button>
    </AppointmentTooltip.Content>
  );

  return (
    <div className={styles.container}>
      <Scheduler data={appointments}>
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <ViewState />
        <MonthView />
        <Appointments onClick={handleAppointmentClick} />
        <Toolbar />
        <DateNavigator currentDate={selectedDate} onCurrentDateChange={setSelectedDate} />

        <AppointmentTooltip
          contentComponent={(props) => <TooltipContent {...props} closeModal={closeModal} />}
          // contentComponent={TooltipContent}
          onVisibilityChange={() => {}}
          onOpenButtonClick={openModal}
        />
      </Scheduler>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          data_interview={data_interview}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default Interview;
