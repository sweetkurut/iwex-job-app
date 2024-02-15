import React, { useEffect, useState } from "react";
import s from "./AddBranch.module.sass";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCity,
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

const AddBranch = ({ handlerComponent, id_branch }) => {
  const { city, detailBranch, detailCompany } = useSelector((state) => state.companyDetails);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    address: "",
    city: "",
    company: "",
    description: "",
    id: "",
    link_address: "",
    name: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCity());
    if (id_branch) {
      dispatch(getMyBranchDetail(id_branch));
    }
  }, []);

  useEffect(() => {
    if (detailBranch && id_branch) {
      setData({
        address: detailBranch.address,
        city: detailBranch.city,
        company: String(detailBranch.company),
        description: detailBranch.description,
        id: String(detailBranch.id),
        link_address: detailBranch.link_address,
        name: detailBranch.name,
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
        ? await dispatch(patchBranchData([id_branch, data]))
        : await dispatch(sendAddBranch(data));
      if (response) {
        dispatch(getMyBranch());
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    handlerComponent("branch");
  };

  const modalConfirm = () => {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Успех"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Филиал успешно сохранен
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
  return (
    <>
      {open && modalConfirm()}
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
              <InputLabel id="demo-simple-select-label">Город</InputLabel>
              <Select
                name="city"
                required
                className={s.input}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Город"
                value={data.city || ""}
                onChange={handleInputChange}>
                {city?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
