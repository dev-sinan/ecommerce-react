import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

export default function ProductForm() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Validation Schema 
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    size: "",
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    image: Yup.mixed().test("fileRequired", "Image is required", function (value) {
      // If editing, image is optional
      if (editId) return true;
      return value instanceof File;
    }),
  });

  // 🔹 Handle form submission (add / update)
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("category", values.category);
      data.append("size", values.size);
      data.append("price", values.price);
      if (values.image) data.append("image", values.image);

      const url = editId
        ? `http://localhost:5000/api/products/${editId}`
        : "http://localhost:5000/api/products";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: data });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || (editId ? "Product updated!" : "Product added!"));
        fetchProducts();
        resetForm();
        setEditId(null);
      } else {
        toast.error(result.message || "Failed to save product!");
      }
    } catch (err) {
      console.error("Error submitting:", err);
      toast.error("Something went wrong!");
    }
  };

  // 🔹 Handle edit
  const handleEdit = (product, setValues) => {
    setValues({
      name: product.name,
      category: product.category,
      size: product.size,
      price: product.price,
      image: null,
    });
    setEditId(product._id);
    toast.info("Editing mode activated!");
  };

  // 🔹 Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        toast.warning(data.message || "Product deleted!");
        fetchProducts();
      } else {
        toast.error("Delete failed!");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting product!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          category: "",
          size: "",
          price: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, resetForm, values, setValues }) => (
          <>
            <Form className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {editId ? "Update Product" : "Add Product"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="name"
                    placeholder="Product Name"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="category"
                    placeholder="Category"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="size"
                    placeholder="Size (optional)"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="price"
                    placeholder="Price"
                    className="border p-2 rounded w-full"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="border p-2 rounded w-full"
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                    required={!editId}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </Form>

            {/* Product List */}
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {products.length === 0 ? (
                <p className="text-gray-500">No products added yet.</p>
              ) : (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white p-4 rounded-lg shadow flex flex-col items-center"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-32 h-32 object-cover mb-3 rounded"
                    />
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600">{p.category}</p>
                    {p.size && (
                      <p className="text-sm text-gray-600">Size: {p.size}</p>
                    )}
                    <p className="font-bold mt-2">₹{p.price}</p>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(p, setValues)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
