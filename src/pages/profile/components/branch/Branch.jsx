import { useEffect } from "react";
import s from "./Branch.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { getMyBranch } from "../../../../store/slices/companyDetailsSlice";
import { useState } from "react";
import AddBranch from "./AddBranch/AddBranch";
import ModalWarning from "../../../../components/modalWarning/ModalWarning";

const Branch = () => {
  const { branch, detailCompany } = useSelector((state) => state.companyDetails);
  const [id_branch, setId_branch] = useState(null);
  const [component, setComponent] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);

  const dispatch = useDispatch();

  const handlerComponent = (id) => {
    if (Object.keys(detailCompany).length > 0) {
      setId_branch(id);
      setComponent(!component);
    } else {
      const message = {
        title: 'Предупреждение',
        text: 'Вам нужно заполнить данные о компании',
      }
      setModalMessage(message)
    }
  };

  useEffect(() => {
    dispatch(getMyBranch());
  }, []);

  const filledBranch = [...branch, ...new Array(Math.max(9 - (branch?.length || 0), 0)).fill(null)];

  return (
    <div className={s.container}>
      <ModalWarning modalMessage={modalMessage} />
      {!component && (
        <button className={s.btn} onClick={() => handlerComponent(null)}>
          Добавить филиал
        </button>
      )}
      {component ? (
        <AddBranch handlerComponent={handlerComponent} id_branch={id_branch} />
      ) : (
        <ul className={s.ul}>
          <li>
            <span>номер</span>
            <span>Название</span>
            <span>Земля</span>
            <span>город</span>
          </li>
          {filledBranch.map((e, index) => (
            <li key={index}>
              {e ? (
                <>
                  <span>{index + 1}</span>
                  <span>{e?.name}</span>
                  <span>{e?.land_name}</span>
                  <span>{e?.city}</span>
                  <button className={s.btn} onClick={() => handlerComponent(e?.id)}>
                    Подробнее
                  </button>
                </>
              ) : (
                <>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Branch;
