import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function VerifyOtp() {
  const email = localStorage.getItem("resetEmail");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const resendOtp = async () => {
    await axios.post("/api/users/send-otp", { email });
    toast.success("OTP resent!");
    setTimer(30);
    setCanResend(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;

    try {
      const { data } = await axios.post("/api/users/verify-otp", { email, otp });
      toast.success(data.message);
      window.location.href = "/reset-password";
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <form onSubmit={verifyOtp} className="p-6 max-w-md mx-auto mt-20 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>

      <p className="text-center mb-2">OTP sent to <b>{email}</b></p>

      <input type="number" name="otp" placeholder="Enter OTP"
        className="w-full p-3 border rounded mb-3" required />

      <button type="submit" className="w-full bg-green-600 text-white p-3 rounded">
        Verify OTP
      </button>

      <div className="text-center mt-3">
        {canResend  
          ? <button className="text-green-600" onClick={resendOtp}>Resend OTP</button>
          : <span>Resend in {timer}s</span>
        }
      </div>
    </form>
  );
}
