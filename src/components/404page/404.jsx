import styles from "./404.module.sass";

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        404 <span>page not found</span>
      </h1>
    </div>
  );
};

export default PageNotFound;
