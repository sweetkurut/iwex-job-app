import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Company.module.sass";
import {
  getCompanyData,
  patchCompanyData,
  sendCompanyData,
} from "../../../../store/slices/companyDetailsSlice";
import { TextField } from "@mui/material";

const Company = ({ setComponent }) => {
  const { detailCompany = {} } = useSelector((state) => state.companyDetails);
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    description: "",
    icon: "",
    iin: "",
    position: "",
    contact_info: "",
    contact_person: "",
    payment_info: "",
  });
  const [data, setData] = useState(initialData);
  const [edit, setEdit] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getCompanyData());
  }, []);

  useEffect(() => {
    if (Object.keys(detailCompany).length > 0) {
      const newData = {};

      for (const key in detailCompany) {
        if (detailCompany[key] !== undefined && detailCompany[key] !== null) {
          newData[key] = detailCompany[key];
        }
      }
      setInitialData((prevInitialData) => {
        const newInitialData = { ...prevInitialData, ...newData };
        setData(newInitialData);
        return newInitialData;
      });
    }
  }, [detailCompany]);

  const handleCancel = () => {
    setData(initialData);
    setImageSrc(null);
    setEdit(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setIsImageChanged(true);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setData((prevData) => ({
        ...prevData,
        icon: file,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      if (key !== "icon" && data[key] !== initialData[key]) {
        formData.append(key, data[key]);
      }
    }
    if (isImageChanged && data.icon) {
      formData.append("icon", data.icon);
    }

    try {
      if (Object.keys(detailCompany).length === 0) {
        const response = await dispatch(sendCompanyData(formData)).unwrap();
        dispatch(getCompanyData());
        response && setEdit(false);
      } else {
        const response = await dispatch(patchCompanyData(formData)).unwrap();
        response && setEdit(false);
      }
    } catch (error) {
      console.error(error || "An unknown error occurred");
    }
  };

  return (
    <form onSubmit={onSubmit} className={s.container}>
      <div className={s.box}>
        <div>
          <div className={s.icon}>
            <img src={imageSrc || data?.icon} alt="logo" />
          </div>
          {edit && (
            <div>
              <input
                required={!detailCompany?.icon}
                type="file"
                onChange={handleImageChange}
              />
              <span className={s.errorMessage}>Выберите логотип</span>
            </div>
          )}
        </div>
        <div className={s.box_button}>
          {!edit ? (
            <button
              className={s.btn}
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
              }}
            >
              {detailCompany?.id ? 'Редактировать' : 'Добавить'}
            </button>
          ) : (
            <>
              <button className={s.btn}>Сохранить</button>
              <button className={s.btn} onClick={handleCancel}>
                Отмена
              </button>
            </>
          )}
        </div>
      </div>
      <div className={s.wrapper}>
        <div className={s.ul}>
          <h2 className={s.title}>Основные данные</h2>
          <TextField
            value={data?.first_name || ""}
            onChange={handleInputChange}
            className={`${s.input} ${edit && s.input_edit}`}
            name="first_name"
            label="Имя"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.last_name || ""}
            onChange={handleInputChange}
            className={s.input}
            name="last_name"
            label="Фамилия"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.position || ""}
            onChange={handleInputChange}
            className={s.input}
            name="position"
            label="Должность"
            disabled={!edit}
            required
          />

          <h2 className={s.title}>Контактные данные</h2>
          <TextField
            value={data?.contact_info || ""}
            onChange={handleInputChange}
            className={s.input}
            name="contact_info"
            label="Контактные данные"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.contact_person || ""}
            onChange={handleInputChange}
            className={s.input}
            name="contact_person"
            label="Контактное лицо"
            disabled={!edit}
            required
          />
        </div>
        <div className={s.ul}>
          <h2 className={s.title}>Данные компании</h2>
          <TextField
            value={data?.name || ""}
            onChange={handleInputChange}
            className={s.input}
            name="name"
            label="Название компании"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.iin || ""}
            onChange={handleInputChange}
            className={s.input}
            name="iin"
            label="ИИН"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.payment_info || ""}
            onChange={handleInputChange}
            className={s.input}
            name="payment_info"
            label="Реквизиты компании"
            disabled={!edit}
            required
          />
          <TextField
            value={data?.description || ""}
            name="description"
            className={s.input}
            label="Описание"
            disabled={!edit}
            required
            multiline
            rows={6}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default Company;
