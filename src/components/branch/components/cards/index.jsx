import { useState } from "react";
import styles from "./cards.module.sass";
import { useEffect } from "react";
import allAPIs from "../../../../services/API";

const Cards = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const branchesData = () => {
      try {
        const res = allAPIs.getMyBranch();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    branchesData();
  }, []);

  return (
    <div className={styles.cards}>
      <div className={styles.card}></div>
    </div>
  );
};

export default Cards;
