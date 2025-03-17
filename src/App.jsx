import styles from "./App.module.css";
import HomePages from "./pages/HomePages/HomePages.jsx";
import CatalogPages from "./pages/CatalogPages/CatalogPages.jsx";
import InfoPages from "./pages/InfoPage/InfoPages.jsx";
import SvgSprite from "./components/SvgSprite/SvgSprite.jsx";

import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation.jsx";
import NotFoundPages from "./pages/NotFoundPages/NotFoundPages.jsx";

function App() {
  return (
    <div>
      <SvgSprite />
      <Navigation />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/catalog" element={<CatalogPages />} />
          <Route path="/catalog/:id" element={<InfoPages />} />
          <Route path="*" element={<NotFoundPages />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
