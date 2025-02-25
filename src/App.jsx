import clsx from "clsx";
import styles from "./App.module.css";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages/HomePages.jsx";
import CatalogPages from "./pages/CatalogPages.jsx";
import InfoPages from "./pages/InfoPages.jsx";

function App() {
  return (
    <div className={styles.container}>
      <img src="../src/components/img/Logo.png" />

      <NavLink
        className={({ isActive }) =>
          clsx(styles.link, isActive && styles.active)
        }
        to="/"
      >
        Home Page
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.link, isActive && styles.active)
        }
        to="./catalog"
      >
        Catalog Page
      </NavLink>

      <div>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/catalog" element={<CatalogPages />} />
          <Route path="/catalog/:id" element={<InfoPages />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
