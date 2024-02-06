import styles from "./cards.module.sass";

const Cards = () => {
  // const [data, setData] = useState();

  // useEffect(() => {
  //   const branchesData = () => {
  //     try {
  //       const res = allAPIs.getMyBranch();
  //       setData(res);
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   branchesData();
  // }, []);

  return (
    <div className={styles.cards}>
      <div className={styles.card}></div>
    </div>
  );
};

export default Cards;
