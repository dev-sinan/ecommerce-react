import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/cart/user/userSlice";

// Validation schema
const validationSchema = Yup.object({
  mobileOrEmail: Yup.string()
    .required("Mobile or Email is required")
    .test(
      "is-valid",
      "Enter a valid email or 10-digit mobile number",
      (v) => /^\d{10}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { mobileOrEmail: "", password: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        values.mobileOrEmail = values.mobileOrEmail.trim();
        values.password = values.password.trim();

        const { data } = await axios.post("/api/users/login", values);

        toast.success(data.message || "Login successful ✅", {
          autoClose: 1000,
          theme: "colored",
        });

        
        localStorage.setItem("token", data.token);

        // Save to Redux also
        dispatch(
          loginSuccess({
            user: data.user,
            token: data.token,
          })
        );

        resetForm();

        // Redirect back to previous page
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        setTimeout(() => {
          navigate(redirectPath, { replace: true });
        }, 1200);

      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed ❌", {
          autoClose: 2000,
          theme: "colored",
        });
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
          Welcome Back
        </h2>

        {/* Mobile or Email */}
        <div className="mb-3">
          <input
            name="mobileOrEmail"
            placeholder="Mobile or Email"
            value={formik.values.mobileOrEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {formik.touched.mobileOrEmail && formik.errors.mobileOrEmail && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.mobileOrEmail}
            </p>
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
            className="w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
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

        {/* Login Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-green-500 text-white py-3 rounded-lg mt-3 hover:bg-green-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-500 font-semibold hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
