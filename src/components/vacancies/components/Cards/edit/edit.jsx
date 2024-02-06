import { TextField } from "@mui/material";
import styles from "./edit.module.sass";

const EditVacancy = ({ onclose }) => {
  return (
    <div className={styles.edit_wrapper} onClick={onclose}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.branch_position}>
            <div className={styles.input_group}>
              <label>Филиал</label>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className={styles.inputz}
              />
            </div>
            <div className={styles.input_group}>
              <label>Позиция</label>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className={styles.inputz}
              />
            </div>
          </div>
          <div className={styles.experience_clothing}>
            <div className={styles.input_group}>
              <label>Опыт работы</label>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className={styles.inputz}
              />
            </div>
            <div className={styles.input_group}>
              <label>Форма одежды</label>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className={styles.inputz}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVacancy;
