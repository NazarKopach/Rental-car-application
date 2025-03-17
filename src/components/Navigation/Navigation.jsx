import clsx from "clsx";
import styles from "./Navigation.module.css";
import { Icon } from "../Icon/Icon";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className={styles.nav_wrapper}>
      <Icon id="icon-Logo" width="106" height="16" />
      <div className={styles.header_nav}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.active)
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.active)
          }
          to="./catalog"
        >
          Catalog
        </NavLink>
      </div>
    </div>
  );
};
