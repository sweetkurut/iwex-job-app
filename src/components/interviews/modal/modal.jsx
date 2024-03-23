import styles from "./modal.module.sass";
import { IoMdClose } from "react-icons/io";

const Modal = ({ onClose, appointment }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h3>Данные из сервера</h3>
      </div>
      <IoMdClose className={styles.close} onClick={onClose} />
    </div>
  );
};

export default Modal;
