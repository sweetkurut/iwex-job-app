import styles from "./branch.module.sass";
import Cards from "./components/cards";

const Branches = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Филиалы</h2>
        <Cards />
      </div>
    </div>
  );
};

export default Branches;
