import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name too short")
    .required("Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
    .required("Mobile is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: "", mobile: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post("/api/users/signup", values);

        //  Success Toast + delayed redirect
        toast.success(data.message || "Signup successful ✅", { autoClose: 1200 });
        resetForm();

        // Wait until toast finishes before navigating
        setTimeout(() => navigate("/login"), 1300);
      } catch (err) {
        console.error("❌ Signup error:", err);
        toast.error(err.response?.data?.message || "Signup failed ❌");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        {/* Name */}
        <div className="mb-3">
          <input
            name="name"
            placeholder="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.mobile}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            name="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-3">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mb-2">{formik.errors.password}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-3 hover:bg-blue-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {formik.isSubmitting ? "Signing up..." : "Signup"}
        </button>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
