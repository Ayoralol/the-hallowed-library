import styles from "./Button.module.scss";

const Button = ({children, onClick, disabled = false, size = ""}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${styles[size]}`}>
      {children}
    </button>
  );
};

export default Button;
