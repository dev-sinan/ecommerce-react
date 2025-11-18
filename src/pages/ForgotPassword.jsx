import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const sendOtp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const { data } = await axios.post("/api/users/send-otp", { email });
      toast.success(data.message);
      localStorage.setItem("resetEmail", email);
      window.location.href = "/verify-otp";
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={sendOtp} className="p-6 max-w-md mx-auto mt-20 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

      <input type="email" name="email" placeholder="Enter your email"
        className="w-full p-3 border rounded mb-3" required />

      <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">
        Send OTP
      </button>
    </form>
  );
}
