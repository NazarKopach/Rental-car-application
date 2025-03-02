import styles from "./App.module.css";
import HomePages from "./pages/HomePages/HomePages.jsx";
import CatalogPages from "./pages/CatalogPages/CatalogPages.jsx";
import InfoPages from "./pages/InfoPage/InfoPages.jsx";
import SvgSprite from "./components/SvgSprite/SvgSprite.jsx";

import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation.jsx";

function App() {
  return (
    <div className={styles.container}>
      <div>
        <SvgSprite />
        <Navigation />
      </div>

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
