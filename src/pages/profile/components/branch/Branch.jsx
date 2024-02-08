import React, { useEffect } from 'react';
import s from './Branch.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBranch } from '../../../../store/slices/companyDetailsSlice';
import { useState } from 'react';
import AddBranch from './AddBranch/AddBranch';

const Branch = () => {
    const { branch } = useSelector(state => state.companyDetails);
    const [id_branch, setId_branch] = useState(null)
    const [component, setComponent] = useState(false);
    const dispatch = useDispatch();
    const handlerComponent = (id) => {
        setId_branch(id)
        setComponent(!component)
    }
    useEffect(() => {
        dispatch(getMyBranch());
    }, []);

    const filledBranch = [...branch, ...new Array(Math.max(9 - (branch?.length || 0), 0)).fill(null)];

    return (
        <div className={s.container}>
            {!component && <button className={s.btn} onClick={() => handlerComponent(null)}>Добавить филиал</button>}
            {component ? <AddBranch handlerComponent={handlerComponent} id_branch={id_branch} />
                :
                <ul className={s.ul}>
                    <li>
                        <span>номер</span>
                        <span>Название</span>
                        <span>город</span>
                    </li>
                    {filledBranch.map((e, index) => (
                        <li key={index}>
                            {e ? (
                                <>
                                    <span>{index + 1}</span>
                                    <span>{e?.name}</span>
                                    <span>{e?.city}</span>
                                    <button className={s.btn} onClick={() => handlerComponent(e?.id)}>Подробнее</button>
                                </>
                            ) : (
                                <>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default Branch;
