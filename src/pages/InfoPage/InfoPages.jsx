import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./InfoPage.module.css";
import { Icon } from "../../components/Icon/Icon";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProfileSchema } from "../../utils/schema.js";
import toast, { Toaster } from "react-hot-toast";

const InfoPages = () => {
  const { id } = useParams();
  const [carById, setCarById] = useState(null);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    booking: "",
    textarea: "",
  };

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        setLoader(true);
        const { data } = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`
        );
        setCarById(data);
      } catch (error) {
        console.error("Failed to fetch carId data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchCarById();
  }, [id]);

  const getCityAndCountry = (address) => {
    if (!address) return { city: "", country: "" };

    const addressParts = address.split(",").map((part) => part.trim());
    const city =
      addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
    const country =
      addressParts.length > 0 ? addressParts[addressParts.length - 1] : "";

    return { city, country };
  };

  const handleSubmit = (values, { resetForm }) => {
    toast.success("Successfully Book car !");
    console.log("Form submitted:", values);
    resetForm();
  };

  if (!carById) return <Loader />;
  const { city, country } = getCityAndCountry(carById.address);
  return (
    <div className={styles.info_page_div}>
      {loader && <Loader />}
      <Toaster position="top-center" reverseOrder={false} duration="5000" />
      <div className={styles.info_img_form_div}>
        <img
          src={carById.img}
          alt={carById.description}
          className={styles.info_img}
        />
        <div className={styles.contact_form_div}>
          <Formik
            initialValues={initialValues}
            validationSchema={addProfileSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <h3 className={styles.form_title}>Book your car now</h3>
              <p className={styles.form_p}>
                Stay connected! We are always ready to help you.
              </p>
              <label className={styles.label}>
                <Field
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="Name"
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="name"
                  component="span"
                />
              </label>
              <label className={styles.label}>
                <Field
                  className={styles.input}
                  name="email"
                  type="email"
                  placeholder="exampel@com"
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="email"
                  component="span"
                />
              </label>
              <label className={styles.label}>
                <Field
                  className={styles.input}
                  name="booking"
                  type="date"
                  placeholder="Booking date"
                />
                <ErrorMessage
                  className={styles.errorMessage}
                  name="booking"
                  component="span"
                />
              </label>
              <Field
                as="textarea"
                name="textarea"
                className={styles.text_area}
                placeholder="Comments"
              />
              <button className={styles.button_info_send} type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      <div className={styles.info_page_description_div}>
        <p className={styles.info_page_description_brand}>
          {carById.brand} {carById.model}, {carById.year}
        </p>
        <p className={styles.info_page_description_address}>
          <Icon id="icon-Location" width="16" height="16" /> {city}, {country}{" "}
          Mileage: {carById.mileage} km
        </p>
        <p className={styles.info_page_description_price}>
          {carById.rentalPrice} $
        </p>
        <p className={styles.info_page_description}>{carById.description}</p>
        <div className={styles.info_rental_conditions}>
          <h2 className={styles.info_h2_title}>Rental Conditions: </h2>
          <ul className={styles.info_list}>
            {carById.rentalConditions.map((item) => {
              return (
                <li key={item} className={styles.info_list_item}>
                  <Icon id="icon-Location" width="16" height="16" /> {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.info_car_specafications}></div>
        <h2 className={styles.info_h2_title}>Car Specifications:</h2>
        <p className={styles.info_list_item}>
          <Icon id="icon-calendar" width="16" height="16" />
          {"  "}
          Year: {carById.year}
        </p>
        <p className={styles.info_list_item}>
          <Icon id="icon-car" width="16" height="16" />
          {"  "}
          Type: {carById.type}
        </p>
        <p className={styles.info_list_item}>
          <Icon id="icon-fuel-pump" width="16" height="16" />
          {"  "}
          Fuel Consumption: {carById.fuelConsumption}
        </p>
        <p className={styles.info_p_item}>
          <Icon id="icon-gear" width="16" height="16" />
          {"  "}
          Engine Size: {carById.engineSize}
        </p>
        <div className={styles.info_accessories}>
          <h2 className={styles.info_h2_title}>
            Accessories and functionalities:
          </h2>
          <ul>
            {carById.accessories.map((item) => {
              return (
                <li key={item} className={styles.info_list_item}>
                  <Icon id="icon-check-circle" width="16" height="16" /> {item}
                </li>
              );
            })}
          </ul>
          <ul>
            {carById.functionalities.map((item) => {
              return (
                <li key={item} className={styles.info_list_item}>
                  <Icon id="icon-check-circle" width="16" height="16" /> {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoPages;
