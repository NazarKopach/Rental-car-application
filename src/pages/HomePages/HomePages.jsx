import { Icon } from "../../components/Icon/Icon.jsx";
import styles from "./HomePages.module.css";

const HomePages = () => {
  return (
    <div className={styles.homePageContainer}>
      <div>
        <h1 className={styles.home_page_title}>Find your perfect rental car</h1>
        <h3 className={styles.home_page_info}>
          Reliable and budget-friendly rentals for any journey
        </h3>
        <button className={styles.home_page_button}>View Catalog</button>
      </div>
    </div>
  );
};

export default HomePages;
