import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Box, Typography, MenuItem, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useRestaurantId } from '../../context/userContext.jsx'; // Assuming you have a context to get the restaurant ID

const URL = "http://localhost:4000";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  discountPercentage: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Must be at least 0"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  status: Yup.string().required("Status is required"),
  image: Yup.mixed().nullable(),
});

const AddOffer = () => {
  const navigate = useNavigate();
  const restaurantId = useRestaurantId(); // Get restaurant ID from context
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${URL}/api/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.imageUrl; 
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error.message);
      toast.error("Error uploading image. Please try again.");
      return null;
    }
  };

  const onFormSubmit = async (values, { resetForm }) => {
    const imageUrl = await uploadImageToCloudinary();

    const formData = {
      restaurantId, // Include restaurant ID in the form data
      name: values.name,
      discountPercentage: values.discountPercentage,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      imageUrl, // Use the imageUrl (which could be null)
    };

    try {
      const response = await axios.post(`${URL}/api/offer/${restaurantId}`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        resetForm();
        removeImage();
        toast.success("Offer added successfully!");
        navigate('/admin/offersList'); // Redirect to offers list
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Form submission error:", error.response?.data || error.message);
      toast.error(`Error submitting form: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <Box className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <Typography variant="h4" className="text-center text-2xl font-bold mb-6">
        Add a New Offer
      </Typography>
      <Formik
        initialValues={{
          name: "",
          discountPercentage: "",
          startDate: "",
          endDate: "",
          status: "Active",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-6">
            <Box className="flex justify-center mb-6">
              <Box className="relative w-full max-w-md bg-yellow-50 border-2 border-orange-400 border-dashed rounded-lg p-4 flex flex-col items-center">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Image Preview" className="max-w-full max-h-48 rounded-lg mb-2" />
                    <Button type="button" onClick={removeImage} variant="contained" color="error" className="absolute top-2 right-2">
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <input type="file" id="image" name="image" onChange={handleImageChange} className="hidden" />
                    <label htmlFor="image" className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                      Upload Offer Image (optional)
                    </label>
                  </>
                )}
              </Box>
            </Box>

            <Box className="space-y-6">
              <Field as={TextField} label="Name" name="name" fullWidth variant="outlined" helperText={<ErrorMessage name="name" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Discount Percentage" name="discountPercentage" type="number" fullWidth variant="outlined" helperText={<ErrorMessage name="discountPercentage" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Start Date" name="startDate" type="datetime-local" fullWidth variant="outlined" helperText={<ErrorMessage name="startDate" component="div" className="text-red-600" />} />
              <Field as={TextField} label="End Date" name="endDate" type="datetime-local" fullWidth variant="outlined" helperText={<ErrorMessage name="endDate" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Status" name="status" select fullWidth variant="outlined" helperText={<ErrorMessage name="status" component="div" className="text-red-600" />}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Field>
            </Box>

            <Box className="mt-6">
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Offer
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOffer;
