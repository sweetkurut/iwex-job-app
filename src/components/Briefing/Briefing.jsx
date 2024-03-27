import React, { useEffect, useState } from 'react';
import s from './Briefing.module.sass';
import { useSelector } from 'react-redux';
import Image_company from './../../assets/Image_company.png'
import Image_branch from './../../assets/Image_branch.png'


const BriefingCompany = () => {
    return (
        <div className={s.briefingComponent}>
            <img src={Image_company} alt="Company" className={s.image} />
            <div className={s.text}>
                <h2>Добро пожаловать в систему управления компанией!</h2>
                <p>Прежде чем начать работу, вам необходимо заполнить данные о вашей компании во вкладке профиль.</p>
            </div>
        </div>
    );
};

const BriefingBranch = () => {
    return (
        <div className={s.briefingComponent}>
            <img src={Image_branch} alt="Branch" className={s.image} />
            <div className={s.text}>
                <h2>Добавление филиала</h2>
                <p>Также для управления филиалами вашей компании, вам необходимо добавить новый филиал.</p>
            </div>
        </div>
    );
};


const BriefingVacancy = () => {
    return (
        <div className={s.briefingComponent}>
            <img src={Image_branch} alt="Vacancy" className={s.image} />
            <div className={s.text}>
                <h2>Добавление вакансии</h2>
                <p>Теперь вы можете добавить вакансии в вашу компанию, чтобы привлекать талантливых сотрудников.</p>
            </div>
        </div>
    );
};

export { BriefingCompany, BriefingBranch, BriefingVacancy };
const Briefing = () => {
    const { detailCompany, branch } = useSelector(state => state.companyDetails);
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true); // Состояние для контроля видимости компонента
    const { is_profile } = useSelector(state => state.user);

    let componentToRender = null;
    let buttonLabel = 'Дальше';

    if (step === 0 && (!is_profile)) {
        componentToRender = <BriefingCompany />;
    } else if (step === 1 && (!branch || branch.length === 0)) {
        componentToRender = <BriefingBranch />;
    } else if (step === 2) {
        componentToRender = <BriefingVacancy />;
        buttonLabel = 'Ок';
    }

    const handleNext = () => {
        if (step >= 2) {
            setIsVisible(false);
        } else {
            setStep(step + 1);
        }
    };

    if (!isVisible) {
        return null;
    }


    return (
        <div className={`${s.container} ${componentToRender ? s.active : ''}`}>
            {componentToRender && (
                <>
                    {componentToRender}
                    <button className={s.button} onClick={handleNext}>{buttonLabel}</button>
                </>
            )}
        </div>
    );
};

export default Briefing;
