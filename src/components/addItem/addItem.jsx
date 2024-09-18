import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Box, Typography, InputLabel } from "@mui/material";
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

const AddItem = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${URL}/api/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data.imageUrl; // Return the Cloudinary image URL
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error.message);
      toast.error("Error uploading image. Please try again.");
      return null;
    }
  };

  // Handle form submission
  const onFormSubmit = async (values, { resetForm }) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    // Upload image first
    const imageUrl = await uploadImageToCloudinary();
    if (!imageUrl) return; // Stop if image upload fails

    // Prepare form data for food item
    const formData = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      cookTime: values.cookTime,
      itemType: values.itemType,
      isFeatured: values.isFeatured === "Active", // Convert to boolean
      recommended: values.recommended === "Active", // Convert to boolean
      status: values.status,
      imageUrl // Add Cloudinary image URL
    };

    try {
      const response = await axios.post(`${URL}/api/food/add`, formData);

      if (response.status === 201) {
        resetForm();
        setImage(null);
        setImagePreview(null);
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
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
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
          isFeatured: "Inactive", // Updated to string
          recommended: "Inactive", // New field
          status: "Active"
        }}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-6">
            <Box className="flex justify-center mb-6">
              <div className="relative w-full max-w-md bg-yellow-50 border-2 border-orange-400 border-dashed rounded-lg p-4 flex flex-col items-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="max-w-full max-h-48 rounded-lg mb-2"
                    />
                    <Button
                      type="button"
                      onClick={removeImage}
                      variant="contained"
                      color="error"
                      className="absolute top-2 right-2"
                    >
                      Remove
                    </Button>
                  </>
                ) : (
                  <>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Upload Food Image
                    </label>
                  </>
                )}
              </div>
            </Box>

            <Box className="space-y-6">
              {/* Dish Name */}
              <div className="relative">
                <InputLabel htmlFor="name" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Dish Name
                </InputLabel>
                <Field
                  as="input"
                  name="name"
                  id="name"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter dish name"
                />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Category */}
              <div className="relative">
                <InputLabel htmlFor="category" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Category
                </InputLabel>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Price */}
              <div className="relative">
                <InputLabel htmlFor="price" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Price
                </InputLabel>
                <Field
                  as="input"
                  type="number"
                  name="price"
                  id="price"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter price"
                />
                <ErrorMessage name="price" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Description */}
              <div className="relative">
                <InputLabel htmlFor="description" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Description
                </InputLabel>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter description"
                  rows="4"
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Cook Time */}
              <div className="relative">
                <InputLabel htmlFor="cookTime" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Cook Time
                </InputLabel>
                <Field
                  as="input"
                  name="cookTime"
                  id="cookTime"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="Enter cook time"
                />
                <ErrorMessage name="cookTime" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Item Type */}
              <div className="relative">
                <InputLabel htmlFor="itemType" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Item Type
                </InputLabel>
                <Field
                  as="select"
                  name="itemType"
                  id="itemType"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </Field>
                <ErrorMessage name="itemType" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Is Featured Dropdown */}
              <div className="relative">
                <InputLabel htmlFor="isFeatured" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Is Featured?
                </InputLabel>
                <Field
                  as="select"
                  name="isFeatured"
                  id="isFeatured"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="Inactive">No</option>
                  <option value="Active">Yes</option>
                </Field>
                <ErrorMessage name="isFeatured" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Recommended Dropdown */}
              <div className="relative">
                <InputLabel htmlFor="recommended" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Recommended
                </InputLabel>
                <Field
                  as="select"
                  name="recommended"
                  id="recommended"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="Inactive">No</option>
                  <option value="Active">Yes</option>
                </Field>
                <ErrorMessage name="recommended" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              {/* Status */}
              <div className="relative">
                <InputLabel htmlFor="status" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Status
                </InputLabel>
                <Field
                  as="select"
                  name="status"
                  id="status"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-600 text-sm mt-1" />
              </div>
            </Box>

            {/* Submit Button */}
            <Box className="flex justify-end mt-6">
              <Button type="submit" variant="contained" color="primary">
                Add Dish
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddItem;
