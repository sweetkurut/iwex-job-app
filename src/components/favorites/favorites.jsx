import { useDispatch, useSelector } from "react-redux";
import styles from "./favorite.module.sass";
import { useEffect } from "react";
import { getFavorite } from "../../store/slices/employeeDetailsSlice";
import { Avatar } from "@mui/material";
import { IoHeartSharp } from "react-icons/io5";

const Favorites = () => {
  const { favorite } = useSelector((state) => state.employeeDetails);
  const dispatch = useDispatch();

  console.log(favorite);

  useEffect(() => {
    dispatch(getFavorite());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Избранные</h2>
        <div className={styles.cards}>
          {favorite && favorite.length > 0 ? (
            favorite.map((elem) => (
              // eslint-disable-next-line react/jsx-key
              <div className={styles.card} key={elem?.id}>
                <div className={styles.card_user_photo}>
                  <Avatar
                    src={elem?.user_profile.profile_photo}
                    alt="user_photo"
                    sx={{
                      width: 120,
                      height: 120,
                    }}></Avatar>
                </div>
                <div className={styles.card_info_desc}>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Студент: {elem?.user_profile.first_name}</span>
                  </p>

                  <p className={styles.card_info_desc_subTitle}>
                    <span>Гражданство: {elem?.user_profile.nationality_en}</span>
                  </p>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Пол: {elem?.user_profile.gender_en}</span>{" "}
                  </p>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Знание немецкого языка: {elem?.user_profile.german}</span>{" "}
                  </p>
                  <p className={styles.card_info_desc_subTitle}>
                    <span>Знание английского языка: {elem?.user_profile.english}</span>{" "}
                  </p>
                </div>
                <div className={styles.createXZ}>
                  <p>
                    <span>Дата: {elem?.created_date}</span>
                  </p>
                </div>
                <div className={styles.card_izbrannoe}>
                  {" "}
                  <IoHeartSharp className={styles.heart} />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.student_search}>
              <div className={styles.student_img}>
                <img
                  alt="img-student"
                  src="/izbrannoe.svg"
                  style={{
                    width: "500px",
                  }}
                />
              </div>
              <p className={styles.student_search_title}>Кажется вы ещё не выбрали студента</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
