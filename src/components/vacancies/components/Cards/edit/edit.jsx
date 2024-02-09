import {
  Autocomplete,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./edit.module.sass";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyBranch } from "../../../../../store/slices/companyDetailsSlice";
import { editVacancy, getVacancyDetail } from "../../../../../store/slices/vacancySlice";

// eslint-disable-next-line react/prop-types
const EditVacancy = ({ onclose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.companyDetails);
  const { detailVacancy } = useSelector((state) => state.vacancy);
  const [age, setAge] = useState("");
  const [valueInput, setValueinput] = useState({});
  console.log(valueInput);
  console.log(branch);
  console.log(detailVacancy);
  console.log(EditVacancy);

  useEffect(() => {
    const newData = {};
    for (const key in detailVacancy) {
      if (detailVacancy[key] !== "" && detailVacancy[key] !== null) {
        newData[key] = detailVacancy[key];
      }
    }
    setValueinput(newData);
  }, [detailVacancy]);

  useEffect(() => {
    dispatch(getMyBranch());
    dispatch(getVacancyDetail(id));
  }, [id]);

  const onsubmitEdit = (e) =>
  {
    console.log(valueInput);
    e.preventDefault();
    e.stopPropagation();
    dispatch(editVacancy());
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${index % 2 === 0 ? "00" : "30"}`
  );
  // const inputHandler = () => {
  //   setValueinput((prevdata) => ({
  //     ...prevdata,
  //   }));
  // };

  return (
    <div className={styles.edit_wrapper} onClick={onclose}>
      <div className={styles.container}>
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
          <Link color="inherit" to="/vacancies" className={styles.link_to_home}>
            <IoArrowBack className={styles.arrow} />
          </Link>
          <Typography color="text.primary" className={styles.typography}>
            Редактирования вакансий
          </Typography>
        </Breadcrumbs>
        <form className={styles.form} onSubmit={onsubmitEdit}>
          <div className={styles.branch_position}>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-filled-label">Филиал</InputLabel>
              <Select
                label="Филиал"
                className={styles.TextField}
                value={valueInput?.branch}
                onChange={(e) => setValueinput("branch", e.target.value)}>
                {Array.isArray(branch)
                  ? branch.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item?.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <div className={styles.input_group}>
              <label>Позиция</label>
              <TextField
                id="outlined-basic"
                value={valueInput?.position}
                label="Outlined"
                variant="outlined"
                className={styles.input}
                onChange={(e) => setValueinput("position", e.target.value)}
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
          <div className={styles.experience_clothing}>
            <div className={styles.input_group}>
              <label>Опыт работы</label>
              <TextField
                id="outlined-basic"
                label="Опыт работы"
                value={valueInput?.experience}
                onChange={(e) => setValueinput("experience", e.target.value)}
                variant="outlined"
                className={styles.input}
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div className={styles.input_group}>
              <label>Форма одежды</label>
              <TextField
                id="outlined-basic"
                label="Форма одежды"
                value={valueInput?.clothingform}
                onChange={(e) => setValueinput("clothingform", e.target.value)}
                variant="outlined"
                className={styles.input}
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
          <div className={styles.time_data}>
            <div className={styles.input_group}>
              <label>Время начало работы</label>
              <Autocomplete
                id="Время начала работы"
                value={detailVacancy?.time_start}
                onChange={(e) => setValueinput("time_start", e.target.value)}
                options={timeSlots}
                getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
                style={{ width: "50%" }}
                renderInput={(params) => <TextField {...params} label="начало работы" />}
              />
            </div>
            <div className={styles.input_group}>
              <label>Время конца работы</label>
              <Autocomplete
                id="Время конца работы"
                options={timeSlots}
                getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
                value={detailVacancy?.time_end}
                onChange={(e) => setValueinput("time_end", e.target.value)}
                style={{ width: "50%" }}
                renderInput={(params) => <TextField {...params} label="конец работы" />}
              />
            </div>
          </div>
          <div className={styles.salary_data}>
            <div className={styles.input_group}>
              <label>Зарпалата</label>
              <TextField
                value={valueInput?.salary}
                onChange={(e) => setValueinput("salary", e.target.value)}
                id="outlined-basic"
                label="Зарпалата"
                variant="outlined"
                className={styles.input}
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div className={styles.input_group}>
              <label>Повышение зарплаты</label>
              <FormControl
                fullWidth
                style={{
                  width: "50%",
                }}>
                <InputLabel id="demo-simple-select-label">Повышение зарплаты</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // label="Age"
                  value={valueInput.increase_choices === "true" ? "true" : "false"}
                  // value={detailVacancy?.increase_choices ? 'да': 'нет'}
                  onChange={(e) =>
                    setValueinput({ ...valueInput, increase_choices: e.target.value })
                  }>
                  <MenuItem value={true}>Да</MenuItem>
                  <MenuItem value={false}>Нет</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.language_data}>
            <div className={styles.input_group}>
              <label>Знания немецкого языка</label>
              <FormControl
                style={{
                  width: "50%",
                }}>
                <InputLabel id="german-proficiency-label">Знания немецкого языка</InputLabel>
                <Select
                  labelId="german-proficiency-label"
                  id="german-proficiency"
                  value={valueInput?.language_german}
                  onChange={(e) => setValueinput("language_german", e.target.value)}>
                  <MenuItem value="A1">A1</MenuItem>
                  <MenuItem value="A2">A2</MenuItem>
                  <MenuItem value="B1">B1</MenuItem>
                  <MenuItem value="B2">B2</MenuItem>
                  <MenuItem value="C1">C1</MenuItem>
                  <MenuItem value="C2">C2</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.input_group}>
              <label>Знания английского языка</label>
              <FormControl
                style={{
                  width: "50%",
                }}>
                <InputLabel id="german-proficiency-label">Знания английского языка</InputLabel>
                <Select
                  labelId="german-proficiency-label"
                  id="german-proficiency"
                  value={valueInput?.language_english}
                  onChange={(e) => setValueinput("language_english", e.target.value)}>
                  <MenuItem value="A1">A1</MenuItem>
                  <MenuItem value="A2">A2</MenuItem>
                  <MenuItem value="B1">B1</MenuItem>
                  <MenuItem value="B2">B2</MenuItem>
                  <MenuItem value="C1">C1</MenuItem>
                  <MenuItem value="C2">C2</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.description_duty}>
            <div className={styles.input_group}>
              <label>Обязанности</label>
              <TextField
                multiline
                rows={5}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                className={styles.input}
                value={valueInput?.duty}
                onChange={(e) => setValueinput("duty", e.target.value)}
                style={{
                  width: "50%",
                }}
              />
            </div>
            <div className={styles.input_group}>
              <label>Описание</label>
              <TextField
                multiline
                rows={5}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={valueInput?.description}
                onChange={(e) => setValueinput("description", e.target.value)}
                className={styles.input}
                style={{
                  width: "50%",
                }}
              />
            </div>
          </div>
          <div className={styles.button_wrap}>
            <button>Сохранить изменения</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVacancy;
