import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import styles from "./interview.module.sass";
// import { appointments } from "../../../demo-data/appointments";

const TextEditor = (props) => {
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}>
      <AppointmentForm.Label text="Custom Field" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Custom field"
      />
    </AppointmentForm.BasicLayout>
  );
};

const Interview = () => {
  const appointments = [
    {
      id: 1,
      title: "Meeting with John",
      startDate: new Date(2024, 1, 22, 10, 0),
      endDate: new Date(2024, 1, 22, 11, 0),
    },
    {
      id: 2,
      title: "Lunch with Alice",
      startDate: new Date(2024, 1, 23, 12, 0),
      endDate: new Date(2024, 1, 23, 13, 0),
    },
  ];

  const [data, setData] = useState(appointments);
  const currentDate = "2018-06-27";

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let updatedData = [...prevData];
      if (added) {
        const startingAddedId =
          updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 0;
        updatedData = [...updatedData, { id: startingAddedId, ...added }];
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

  return (
    <div className={styles.container}>
      <Paper>
        <Scheduler data={data}>
          <ViewState currentDate={currentDate} />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <DayView startDayHour={9} endDayHour={15} />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <ConfirmationDialog />
          <AppointmentForm basicLayoutComponent={BasicLayout} textEditorComponent={TextEditor} />
        </Scheduler>
      </Paper>
    </div>
  );
};

export default Interview;
