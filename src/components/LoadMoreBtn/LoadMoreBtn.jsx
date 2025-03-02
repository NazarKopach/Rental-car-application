import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ setPage }) => {
  return (
    <div>
      <button className={styles.LoadMoreBtn} onClick={setPage} type="submit">
        Loade more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
