import axios from "axios";
import styles from "./CatalogPages.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";

const CatalogPages = () => {
  const [carsList, setCarsList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [rentalPrice, setRentalrice] = useState("");
  const [minMileage, setMinleage] = useState("");
  const [maxMileage, setMaxleage] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchCars = async (
    brand = "",
    rentalPrice = "",
    minMileage = "",
    maxMileage = ""
  ) => {
    try {
      const params = {};
      if (brand) params.brand = brand;
      if (rentalPrice) params.rentalPrice = rentalPrice;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      setLoader(true);

      const { data } = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );

      setCarsList(data.cars || []);
    } catch (error) {
      console.error("Failed to fetch water data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCars();

    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(
          `https://car-rental-api.goit.global/brands/`
        );

        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch water data:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleFilter = () => {
    fetchCars(selectedBrand, rentalPrice, minMileage, maxMileage);
  };

  return (
    <div>
      {loader && <Loader />}
      <select
        onChange={(e) => setSelectedBrand(e.target.value)}
        value={selectedBrand}
      >
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setRentalrice(e.target.value)}
        value={rentalPrice}
      >
        <option value="">Choose a price</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
      </select>
      <input
        type="text"
        placeholder="From"
        value={minMileage}
        onChange={(e) => setMinleage(e.target.value)}
      />
      <input
        type="text"
        placeholder="To"
        value={maxMileage}
        onChange={(e) => {
          setMaxleage(e.target.value);
        }}
      />
      <button type="button" onClick={handleFilter}>
        Search
      </button>

      <ul className={styles.gallery}>
        {carsList !== null &&
          carsList.map((item) => {
            return (
              <li key={item.id} className={styles.galleryItem}>
                <img
                  src={item.img}
                  alt={item.description}
                  className={styles.image}
                />
                <div className={styles.car_info}>
                  <p>{item.brand}</p>
                  <p>{item.model}, </p>
                  <p>{item.year} </p>
                  <p>{item.rentalPrice} $</p>
                </div>
                <div>
                  <p>{item.address}</p>
                  <p>{item.rentalCompany}</p>
                  <p>{item.type}</p>
                  <p>{item.mileage}</p>
                </div>

                <button type="button">
                  <Link to={`/catalog/${item.id}`}>Read more</Link>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CatalogPages;
