import * as Yup from "yup";

export const addProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must less 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  booking: Yup.string(),
  textarea: Yup.string(),
});
