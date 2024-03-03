import { useDispatch, useSelector } from "react-redux";
import styles from "./response.module.sass";
import { useEffect } from "react";
import { getInvitation } from "../../store/slices/employeeDetailsSlice";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Loaders from "../../UI/loaders";

const Response = () => {
  const dispatch = useDispatch();
  const { invitation } = useSelector((state) => state.employeeDetails);
  const { isLoading } = useSelector((state) => state.vacancy);
  console.log(invitation);

  useEffect(() => {
    dispatch(getInvitation());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isLoading && <Loaders />}
        <h2 className={styles.title}>Отклики</h2>
        <div className={styles.cards}>
          {invitation && invitation.length > 0 ? (
            invitation?.map((elem) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.card} key={elem?.id}>
                <div className={styles.card_user_photo}>
                  <Avatar
                    src={elem?.user_profile?.profile_photo}
                    alt="user_photo"
                    sx={{
                      width: 120,
                      height: 120,
                    }}></Avatar>
                </div>
                <div className={styles.card_info_desc}>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Студент: {elem?.user_profile?.first_name}</span>
                  </p>

                  <p className={styles.card_info_desc_subTitle}>
                    <span>Гражданство: {elem?.user_profile?.nationality_en}</span>
                  </p>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Пол: {elem?.user_profile?.gender_en}</span>{" "}
                  </p>
                </div>
                <div className={styles.position}>
                  <p className={styles.position_tite}>
                    <span>Филиал: {elem?.branch?.name}</span>
                  </p>
                  <p className={styles.position_tite}>
                    Позиция:
                    <span>{elem?.position?.name}</span>
                  </p>
                </div>
                <div className={styles.createXZ}>
                  <p>
                    <span>Дата: {elem?.created_date}</span>
                  </p>
                </div>
                <div className={styles.button_wrap}>
                  <Link
                    to={"/student-detail/" + elem?.user}
                    state={{ id_vacancy: elem?.vacancy }}
                    className={styles.btn_Link}>
                    Подробнее
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.student_search}>
              <div className={styles.student_img}>
                <img
                  alt="img-student"
                  src="/otkliki.svg"
                  style={{
                    width: "500px",
                  }}
                />
              </div>
              <p className={styles.student_search_title}>
                Кажется на вашу вакансию не нашлось откликов
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Response;
