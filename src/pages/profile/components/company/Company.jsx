import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Company.module.sass';
import { getCompanyData, patchCompanyData, sendCompanyData } from '../../../../store/slices/companyDetailsSlice';

const Input = ({ value, onChange, edit, required }) => (
    <input
        style={{ verticalAlign: 'top' }}
        className={`${s.input} ${edit ? s.active : ''}`}
        disabled={!edit}
        value={value || ''}
        onChange={onChange}
        required={required}
        multiple
    />
);

const Company = ({ setComponent }) => {
    const { isLoading, detailCompany = {} } = useSelector(state => state.companyDetails);
    const dispatch = useDispatch();

    const [initialData, setInitialData] = useState({
        first_name: '',
        last_name: '',
        name: '',
        description: '',
        icon: '',
        iin: '',
    });

    const [data, setData] = useState(initialData);
    const [edit, setEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);


    const handleInputChange = (field, value) => {
        setData(prevData => ({
            ...prevData,
            [field]: value,
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
            setInitialData(prevInitialData => {
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
    const [isImageChanged, setIsImageChanged] = useState(false);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setIsImageChanged(true);
        handleInputChange('icon', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            if (key !== 'icon' && data[key] !== initialData[key]) {
                formData.append(key, data[key]);
            }
        }
        if (isImageChanged && data.icon) {
            formData.append('icon', data.icon);
        }

        try {
            if (Object.keys(detailCompany).length === 0) {
                const response = await dispatch(sendCompanyData(formData)).unwrap();
                response && console.log('response', response);
            } else {
                const response = await dispatch(patchCompanyData(formData)).unwrap();
                response && setEdit(false);
            }
        } catch (error) {
            console.error(error || 'An unknown error occurred');
        }
    };


    return (
        <form onSubmit={onSubmit} className={s.container}>
            <div className={s.box}>
                <div className={s.icon}>
                    <img src={imageSrc || data?.icon} alt="logo" />
                </div>
                {edit &&
                    <>
                        <input required={detailCompany?.icon ? false : true} type="file" onChange={handleImageChange} />
                        <span className={s.errorMessage}>Выберите логотип</span></>
                }
            </div>
            <ul className={s.ul}>
                <li>
                    <span>Имя</span>
                    <Input
                        value={data?.first_name || ''}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        edit={edit}
                        required
                    />
                </li>
                <li>
                    <span>Фамилия</span>
                    <Input
                        value={data?.last_name || ''}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        edit={edit}
                        required
                    />
                </li>
                <li>
                    <span>Название компании</span>
                    <Input
                        value={data?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        edit={edit}
                        required
                    />
                </li>
                <li>
                    <span>ИИН</span>
                    <Input
                        value={data?.iin || ''}
                        onChange={(e) => handleInputChange('iin', e.target.value)}
                        edit={edit}
                    />
                </li>
                <li>
                    <span>Описание</span>
                    <textarea
                        className={`${s.input} ${edit ? s.active : ''}`}
                        disabled={!edit}
                        value={data?.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </li>
            </ul>
            <div className={s.box_button}>
                {!edit ? <button className={s.btn} onClick={(e) => {
                    e.preventDefault()
                    setEdit(!edit)
                }}>Редактировать</button> :
                    <>
                        <button className={s.btn} >Сохранить</button>
                        <button className={s.btn} onClick={handleCancel}>Отмена</button>
                    </>
                }
            </div>
        </form>
    );
};

export default Company;
