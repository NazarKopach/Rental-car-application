import axios from "axios";
import styles from "./CatalogPages.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CatalogPages = () => {
  const [carsList, setCarsList] = useState(null);
  console.log(carsList);

  useEffect(() => {
    const fetchDailyNorm = async () => {
      try {
        const { data } = await axios.get(
          "https://car-rental-api.goit.global/cars"
        );

        setCarsList(data.cars);
      } catch (error) {
        console.error("Failed to fetch water data:", error);
      }
    };

    fetchDailyNorm();
  }, []);

  return (
    <div>
      <select>
        <option value="">Choose a brand</option>
      </select>
      <select>
        <option value="">Choose a price</option>
      </select>
      <input type="text" placeholder="From" />
      <input type="text" placeholder="To" />
      <button>Search</button>

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
