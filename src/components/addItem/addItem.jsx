import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, MenuItem, Select, InputLabel, Box, Typography } from "@mui/material"; // Importing only necessary components from MUI
import { toast } from "react-toastify";
import axios from "axios";

// Define URL for API endpoint
const URL = "http://localhost:4000";

const categories = [
  "Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"
];

const validationSchema = Yup.object({
  name: Yup.string().required("Dish name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  cookTime: Yup.string().required("Cook time is required"),
  itemType: Yup.string().required("Item type is required"),
  isFeatured: Yup.boolean(),
  status: Yup.string().required("Status is required")
});

const AddItem = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const onFormSubmit = async (values, { resetForm }) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", Number(values.price));
    formData.append("category", values.category);
    formData.append("cookTime", values.cookTime);
    formData.append("itemType", values.itemType);
    formData.append("isFeatured", values.isFeatured);
    formData.append("status", values.status);
    formData.append("image", image);

    try {
      const response = await axios.post(`${URL}/api/food/add`, formData);
      if (response.data.success) {
        resetForm();
        setImage(null);
        setImagePreview(null);
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting form");
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
          itemType: "",
          isFeatured: false,
          status: "Active"
        }}
        validationSchema={validationSchema}
        onSubmit={onFormSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-6">
            <Box className="flex justify-center mb-6">
              <div className="relative w-full max-w-md bg-yellow-50 border-2 border-orange-400 border-dashed rounded-lg p-4 flex flex-col items-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Main preview"
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
                      onChange={(event) => {
                        handleImageChange(event);
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
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
                  <option value=""><em>Select Category</em></option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
              </div>

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
                  <option value="Non Veg">Non Veg</option>
                </Field>
                <ErrorMessage name="itemType" component="div" className="text-red-600 text-sm mt-1" />
              </div>

              <div className="relative">
                <InputLabel htmlFor="isFeatured" className="absolute top-0 left-3 -translate-y-1/2 bg-white px-1 text-gray-500 text-sm">
                  Is Featured
                </InputLabel>
                <Field
                  as="select"
                  name="isFeatured"
                  id="isFeatured"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Field>
                <ErrorMessage name="isFeatured" component="div" className="text-red-600 text-sm mt-1" />
              </div>

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

              <Box className="flex justify-end">
                <Button type="submit" variant="contained" color="primary" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddItem;
