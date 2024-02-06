import styles from "./loaders.module.sass";

const Loaders = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loaders;
