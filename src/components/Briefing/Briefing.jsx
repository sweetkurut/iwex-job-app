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
            <img src={Image_branch} alt="Branch" className={s.image} />
            <div className={s.text}>
                <h2>Добавление вакансии</h2>
            </div>
        </div>
    );
};

export { BriefingCompany, BriefingBranch };
const Briefing = () => {
    const { detailCompany, branch } = useSelector(state => state.companyDetails);
    const [step, setStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    let componentToRender = null;
    let buttonLabel = 'Дальше';

    if (step === 0 && (!detailCompany || Object.keys(detailCompany).length === 0)) {
        componentToRender = <BriefingCompany />;
    } else if (step === 1 && Array.isArray(branch) && branch.length === 0) {
        componentToRender = <BriefingBranch />;
        buttonLabel = 'Ок';
    }

    const containerClasses = `${s.container} ${componentToRender ? s.active : s.none}`;

    const handleNext = () => {
        if (step === 1) {
            setCompleted(true);
        } else {
            setStep(step + 1);
        }
    };

    useEffect(() => {
        if (!completed && (!detailCompany || Object.keys(detailCompany).length === 0 || (step === 1 && (!branch || branch.length === 0)))) {
            // Показываем контейнер только если есть необходимость
            setStep(step);
        }
    }, [detailCompany, branch, step, completed]);

    if (completed) {
        return null;
    }

    return (
        <div className={containerClasses}>
            {componentToRender && (
                <>
                    {componentToRender}
                    {(step < 1 || (step === 1 && buttonLabel === 'Ок')) && <button className={s.button} onClick={handleNext}>{buttonLabel}</button>}
                </>
            )}
        </div>
    );
};

export default Briefing;
