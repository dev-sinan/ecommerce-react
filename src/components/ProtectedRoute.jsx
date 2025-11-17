import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // 🔹 Save the page user tried to access
      localStorage.setItem("redirectAfterLogin", location.pathname);
      // 🔹 Instantly redirect to login (no toast)
      navigate("/login", { replace: true });
    }
  }, [token, navigate, location.pathname]);

  if (!token) return null;
  return children;
}
