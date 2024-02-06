import styles from "./cards.module.sass";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBranch } from "../../../../store/slices/companyDetailsSlice";

const Cards = () => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.companyDetails);
  console.log(branch);
  useEffect(() => {
    dispatch(getMyBranch());
  }, []);

  return (
    <div className={styles.cards}>
      {branch?.map((e) => (
        // eslint-disable-next-line react/jsx-key
        <div className={styles.card}>
          <ul className={styles.card_description}>
            <li className={styles.title}>{e?.city}</li>
            <li className={styles.title}>{e?.name}</li>
          </ul>
          </div>
      ))}
    </div>
  );
};

export default Cards;
