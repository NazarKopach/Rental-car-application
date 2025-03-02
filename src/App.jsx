import styles from "./App.module.css";
import HomePages from "./pages/HomePages/HomePages.jsx";
import CatalogPages from "./pages/CatalogPages/CatalogPages.jsx";
import InfoPages from "./pages/InfoPage/InfoPages.jsx";
import SvgSprite from "./components/SvgSprite/SvgSprite.jsx";
import { Header } from "./components/Header/Header.jsx";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={styles.container}>
      <SvgSprite />
      <Header />
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
