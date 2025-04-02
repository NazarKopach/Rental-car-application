import styles from "./App.module.css";
import SvgSprite from "./components/SvgSprite/SvgSprite.jsx";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation.jsx";
import { lazy, Suspense } from "react";

const HomePages = lazy(() => import("./pages/HomePages/HomePages"));
const CatalogPages = lazy(() => import("./pages/CatalogPages/CatalogPages"));
const InfoPages = lazy(() => import("./pages/InfoPage/InfoPages"));
const NotFoundPages = lazy(() => import("./pages/NotFoundPages/NotFoundPages"));

function App() {
  return (
    <div>
      <SvgSprite />
      <Suspense>
        <Navigation />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/catalog" element={<CatalogPages />} />
            <Route path="/catalog/:id" element={<InfoPages />} />
            <Route path="*" element={<NotFoundPages />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
