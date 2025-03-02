import axios from "axios";
import styles from "./CatalogPages.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import { Icon } from "../../components/Icon/Icon.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

const CatalogPages = () => {
  const [carsList, setCarsList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState(() => {
    const storedLikes = localStorage.getItem("likedImages");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });

  const fetchCars = async (
    brand = "",
    rentalPrice = "",
    minMileage = "",
    maxMileage = "",
    page = 1
  ) => {
    try {
      setLoader(true);
      const params = { page };
      if (brand) params.brand = brand;
      if (rentalPrice) params.rentalPrice = Number(rentalPrice);
      if (minMileage) params.minMileage = Number(minMileage);
      if (maxMileage) params.maxMileage = Number(maxMileage);

      const { data } = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );

      if (page === 1) {
        setCarsList(data.cars);
      } else {
        setCarsList((prev) => [...prev, ...data.cars]);
      }

      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch cars data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCars(selectedBrand, rentalPrice, minMileage, maxMileage, page);
  }, [page]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(
          "https://car-rental-api.goit.global/brands/"
        );
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands data:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleFilter = () => {
    setPage(1);
    fetchCars(selectedBrand, rentalPrice, minMileage, maxMileage, 1);
  };

  const toggleLike = (id) => {
    setLiked((prev) => {
      const updatedLikes = { ...prev };

      if (updatedLikes[id]) {
        delete updatedLikes[id];
      } else {
        updatedLikes[id] = true;
      }
      localStorage.setItem("likedImages", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const getCityAndCountry = (address) => {
    if (!address) return { city: "", country: "" };

    const addressParts = address.split(",").map((part) => part.trim());
    const city =
      addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
    const country =
      addressParts.length > 0 ? addressParts[addressParts.length - 1] : "";

    return { city, country };
  };

  return (
    <div>
      {loader && <Loader />}

      <div className={styles.catalog_input_div}>
        <div>
          <p className={styles.catalog_text_info}>Car Brand</p>
          <select
            onChange={(e) => setSelectedBrand(e.target.value)}
            value={selectedBrand}
            className={styles.catalog_input_select}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className={styles.catalog_text_info}>Price/ 1 hour</p>
          <select
            onChange={(e) => setRentalPrice(e.target.value)}
            value={rentalPrice}
            className={styles.catalog_input_select}
          >
            <option value="">Choose a price</option>
            {[10, 20, 30, 40, 50, 60, 70, 80].map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className={styles.catalog_text_info}>Сar mileage / km</p>
          <input
            type="number"
            placeholder="From"
            className={styles.catalog_input_left}
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            placeholder="To"
            className={styles.catalog_input_right}
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>

        <button
          className={styles.catalog_search_btn}
          type="button"
          onClick={handleFilter}
        >
          Search
        </button>
      </div>

      <ul className={styles.gallery}>
        {carsList.map((item) => {
          const { city, country } = getCityAndCountry(item.address);
          return (
            <li key={item.id} className={styles.galleryItem}>
              <div className={styles.catalog_div_img}>
                <img
                  src={item.img}
                  alt={item.description}
                  className={styles.image}
                />
                <button onClick={() => toggleLike(item.id)}>
                  {liked[item.id] ? (
                    <Icon
                      id="icon-Property-1Active"
                      width="16"
                      height="16"
                      className={styles.catalog_icon}
                    />
                  ) : (
                    <Icon
                      id="icon-Property-1Default"
                      width="16"
                      height="16"
                      className={styles.catalog_icon}
                    />
                  )}
                </button>
              </div>
              <div className={styles.car_info}>
                <p>
                  {item.brand}{" "}
                  <span className={styles.model_span}>{item.model}</span>,{" "}
                  {item.year}
                </p>
                <p className={styles.catalog_rental_price}>
                  {item.rentalPrice} $
                </p>
              </div>
              <div>
                <p className={styles.catalog_text_car_info}>
                  {city} | {country} | {item.rentalCompany} | {item.type} |{" "}
                  {item.mileage}
                </p>
              </div>
              <button type="button" className={styles.catalog_read_more_btn}>
                <Link to={`/catalog/${item.id}`}>Read more</Link>
              </button>
            </li>
          );
        })}
      </ul>
      {carsList.length > 0 && page < totalPages && (
        <LoadMoreBtn setPage={() => setPage((prev) => prev + 1)} />
      )}
    </div>
  );
};

export default CatalogPages;
