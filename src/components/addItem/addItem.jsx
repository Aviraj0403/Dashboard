import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Box, Typography, InputLabel, MenuItem, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

// Define URL for API endpoint
const URL = "http://localhost:4000";

// Define categories
const categories = [
  "Salad", "Rolls", "Desserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"
];

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Dish name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  cookTime: Yup.string().required("Cook time is required"),
  itemType: Yup.string().required("Item type is required"),
  isFeatured: Yup.string().required("Please select if the dish is featured"),
  recommended: Yup.string().required("Please select if the dish is recommended"),
  status: Yup.string().required("Status is required")
});

const AddItem = ({ restaurantId }) => {
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
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${URL}/api/upload/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data.imageUrl; 
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error.message);
      toast.error("Error uploading image. Please try again.");
      return null;
    }
  };

  const onFormSubmit = async (values, { resetForm }) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) return;

    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      cookTime: values.cookTime,
      itemType: values.itemType,
      isFeatured: values.isFeatured === "Active",
      recommended: values.recommended === "Active",
      status: values.status,
      imageUrl,
      restaurantId
    };

    try {
      const response = await axios.post(`${URL}/api/food/add`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      if (response.status === 201) {
        resetForm();
        removeImage();
        toast.success("Food item added successfully!");
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
        Add a New Dish
      </Typography>
      <Formik
        initialValues={{
          name: "",
          category: "",
          price: "",
          description: "",
          cookTime: "",
          itemType: "Veg",
          isFeatured: "Inactive",
          recommended: "Inactive",
          status: "Active"
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
                      Upload Food Image
                    </label>
                  </>
                )}
              </Box>
            </Box>

            <Box className="space-y-6">
              <Field as={TextField} label="Dish Name" name="name" fullWidth variant="outlined" helperText={<ErrorMessage name="name" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Category" name="category" select fullWidth variant="outlined" helperText={<ErrorMessage name="category" component="div" className="text-red-600" />}>
                <MenuItem value="" disabled>Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Field>
              <Field as={TextField} label="Price" name="price" type="number" fullWidth variant="outlined" helperText={<ErrorMessage name="price" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Description" name="description" multiline rows={4} fullWidth variant="outlined" helperText={<ErrorMessage name="description" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Cook Time" name="cookTime" fullWidth variant="outlined" helperText={<ErrorMessage name="cookTime" component="div" className="text-red-600" />} />
              <Field as={TextField} label="Item Type" name="itemType" select fullWidth variant="outlined" helperText={<ErrorMessage name="itemType" component="div" className="text-red-600" />}>
                <MenuItem value="Veg">Veg</MenuItem>
                <MenuItem value="Non-Veg">Non-Veg</MenuItem>
              </Field>
              <Field as={TextField} label="Is Featured?" name="isFeatured" select fullWidth variant="outlined" helperText={<ErrorMessage name="isFeatured" component="div" className="text-red-600" />}>
                <MenuItem value="Inactive">No</MenuItem>
                <MenuItem value="Active">Yes</MenuItem>
              </Field>
              <Field as={TextField} label="Recommended" name="recommended" select fullWidth variant="outlined" helperText={<ErrorMessage name="recommended" component="div" className="text-red-600" />}>
                <MenuItem value="Inactive">No</MenuItem>
                <MenuItem value="Active">Yes</MenuItem>
              </Field>
              <Field as={TextField} label="Status" name="status" select fullWidth variant="outlined" helperText={<ErrorMessage name="status" component="div" className="text-red-600" />}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Field>
            </Box>

            <Box className="mt-6">
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Dish
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddItem;
