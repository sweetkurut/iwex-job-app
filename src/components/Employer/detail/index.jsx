import { useParams } from "react-router";
import styles from "./detail.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStaffEmployerById } from "../../../store/slices/companyDetailsSlice";
import Loaders from "../../../UI/loaders";

const EmployerComponentById = () => {
  const { staffEmployerById,isLoading } = useSelector((state) => state.companyDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(staffEmployerById);

  useEffect(() => {
    dispatch(getStaffEmployerById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper_company}>
        {isLoading ? (
          <Loaders />
        ) : (
          <div className={styles.contact}>
            <img
              src={staffEmployerById?.icon}
              alt={staffEmployerById?.name}
              className={styles.icon}
            />
            <div className={styles.box_name}>
              <h4>{staffEmployerById?.name}</h4>
              <p>
                <span>ФИО:</span> {staffEmployerById?.first_name} {staffEmployerById?.last_name}
              </p>
              <p>
                <span>Контактное лицо:</span> {staffEmployerById?.contact_person}
              </p>
              <p>
                <span>x Позиция:</span> {staffEmployerById?.position}
              </p>
              <p>
                <span>Реквизиты компании:</span> {staffEmployerById?.payment_info}
              </p>
              <p>
                <span>ИИН:</span> {staffEmployerById?.iin}
              </p>
            </div>
          </div>
        )}
        <h4 className={styles.title_ul}>Описание</h4>
        <div className={styles.boxListCompany}>
          <p>{staffEmployerById?.description}</p>
        </div>
        <h4 className={styles.title_ul}>Контакты</h4>
        <div className={styles.boxListCompany}>
          <p>{staffEmployerById?.contact_info}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerComponentById;
