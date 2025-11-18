import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const email = localStorage.getItem("resetEmail");

  const resetPassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      const { data } = await axios.post("/api/users/reset-password", {
        email,
        newPassword,
      });
      toast.success(data.message);
      localStorage.removeItem("resetEmail");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={resetPassword} className="p-6 max-w-md mx-auto mt-20 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <input type="password" name="newPassword" placeholder="New Password"
        className="w-full p-3 border rounded mb-3" required />

      <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">
        Reset Password
      </button>
    </form>
  );
}
