import React, { useEffect, useState } from "react";
import s from "./AddBranch.module.sass";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyBranch,
  getMyBranchDetail,
  patchBranchData,
  sendAddBranch,
} from "../../../../../store/slices/companyDetailsSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModalWarning from "../../../../../components/modalWarning/ModalWarning";

const AddBranch = ({ handlerComponent, id_branch }) => {
  const { detailBranch, detailCompany } = useSelector((state) => state.companyDetails);
  const [modalMessage, setModalMessage] = useState({ title: "", text: "" });
  const land_list = [
    'Baden-Württemberg',
    'Bavaria',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hesse',
    'Lower Saxony',
    'Mecklenburg-Vorpommern',
    'North Rhine-Westphalia',
    'Rhineland-Palatinate',
    'Saarland',
    'Saxony',
    'Saxony-Anhalt',
    'Schleswig-Holstein',
    'Thuringia',
  ];

  const [data, setData] = useState({
    address: "",
    land_name: "",
    company: "",
    description: "",
    id: "",
    link_address: "",
    name: "",
    city: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (id_branch) {
      dispatch(getMyBranchDetail(id_branch));
    }
  }, []);
  useEffect(() => {
    if (detailBranch && id_branch) {
      setData({
        address: detailBranch.address,
        land_name: detailBranch.land_name,
        company: String(detailBranch.company),
        description: detailBranch.description,
        id: String(detailBranch.id),
        link_address: detailBranch.link_address,
        name: detailBranch.name,
        city: detailBranch.city,
      });
    }
  }, [detailBranch, id_branch]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = id_branch
        ? await dispatch(patchBranchData([id_branch, data])).unwrap()
        : await dispatch(sendAddBranch(data)).unwrap()
      if (response) {
        dispatch(getMyBranch());
        setModalMessage({ title: "Успех", text: "Филиал успешно сохранен" });
        handlerComponent("branch");

      }
    } catch (error) {
      setModalMessage({ title: "Ошибка", text: error });

    }
  };

  return (
    <>
      <ModalWarning modalMessage={modalMessage} />
      <form onSubmit={(e) => onSubmit(e)} className={s.container}>
        <div className={s.wrapper}>
          <div className={s.box}>
            <TextField
              value={data?.name || ""}
              name="name"
              required
              className={s.input}
              id="outlined-basic"
              label="Название филиала"
              variant="outlined"
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Земля</InputLabel>
              <Select
                name="land_name"
                required
                className={s.input}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Земля"
                value={data?.land_name}
                onChange={handleInputChange}>
                {land_list?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              value={data?.city || ""}
              name="city"
              required
              className={s.input}
              id="outlined-basic"
              label="Город"
              variant="outlined"
              onChange={handleInputChange}
            />
            <TextField
              value={data?.address || ""}
              name="address"
              required
              className={s.input}
              id="outlined-basic"
              label="Адрес"
              variant="outlined"
              onChange={handleInputChange}
            />
            <TextField
              value={data?.link_address || ""}
              name="link_address"
              className={s.input}
              id="outlined-basic"
              label="Ссылка на адрес"
              variant="outlined"
              onChange={handleInputChange}
            />
          </div>
          <TextField
            value={data?.description || ""}
            name="description"
            className={s.textarea}
            id="outlined-multiline-static"
            label="Описание"
            multiline
            rows={11}
            variant="outlined"
            onChange={handleInputChange}
          />
        </div>
        <div className={s.box_button}>
          <button className={s.btn}>Сохранить</button>
          <button className={s.btn} onClick={handlerComponent}>
            Отмена
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBranch;


